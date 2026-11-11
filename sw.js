/* LENSY service worker: offline support, reminders and the Yes/No buttons. */
const VERSION = 'lensy-v4';
const STATE = 'lensy-state';
const SHELL = ['./', './index.html', './styles.css', './app.js', './config.js', './supabase.js', './privacy.html', './privacy.js', './manifest.json', './icon-192.png', './icon-512.png', './apple-touch-icon.png'];
const STATE_URL = new URL('./__lensy_state', self.location.href).href;
const PENDING_URL = new URL('./__lensy_pending', self.location.href).href;
const ASKED_URL = new URL('./__lensy_asked', self.location.href).href;

try { importScripts('./config.js'); } catch (e) {}
const CFG = self.LENSY_CONFIG || {};

const pad = n => String(n).padStart(2, '0');
const today = () => { const d = new Date(); return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); };
const isDate = s => typeof s === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(s);
const clip = (s, n) => String(s == null ? '' : s).slice(0, n);

async function readJSON(url) {
  const cache = await caches.open(STATE);
  const res = await cache.match(url);
  if (!res) return null;
  try { return await res.json(); } catch (e) { return null; }
}
async function writeJSON(url, data) {
  const cache = await caches.open(STATE);
  await cache.put(url, new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } }));
}

self.addEventListener('install', event => {
  // One missing file must not block the install, so add them one by one.
  event.waitUntil(
    caches.open(VERSION)
      .then(cache => Promise.allSettled(SHELL.map(url => cache.add(new Request(url, { cache: 'reload' })))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION && k !== STATE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Own files only: newest version when online, saved copy when offline.
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  event.respondWith(
    fetch(req)
      .then(res => {
        if (res.ok) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
        return res;
      })
      .catch(() => caches.open(VERSION).then(c => c.match(req, { ignoreSearch: true })).then(hit => hit || (req.mode === 'navigate' ? caches.open(VERSION).then(c => c.match('./index.html')) : Response.error())))
  );
});

function ask(text, date, token) {
  return self.registration.showNotification('LENSY', {
    body: clip(text.body, 120) || 'Did you wear your lenses today?',
    tag: 'lensy-daily',
    icon: 'icon-192.png',
    badge: 'icon-192.png',
    data: { date, token: token || null },
    actions: [{ action: 'yes', title: clip(text.yes, 20) || 'Yes' }, { action: 'no', title: clip(text.no, 20) || 'No' }]
  });
}

/* Reminder sent by the server (signed-in users). */
self.addEventListener('push', event => {
  let d = {};
  try { d = event.data ? event.data.json() : {}; } catch (e) {}
  const date = isDate(d.date) ? d.date : today();
  event.waitUntil(ask({ body: d.body, yes: d.yes, no: d.no }, date, typeof d.token === 'string' ? clip(d.token, 200) : null));
});

/* Reminder without an account: best effort, only where the browser allows background checks. */
async function maybeRemind() {
  const state = await readJSON(STATE_URL);
  if (!state || state.server || !state.notif || !state.notif.on) return;
  const day = today();
  if (state.log && state.log[day]) return;
  const pending = (await readJSON(PENDING_URL)) || [];
  if (pending.includes(day)) return;
  const [h, m] = String(state.notif.time || '20:00').split(':').map(Number);
  const now = new Date();
  if (now.getHours() * 60 + now.getMinutes() < h * 60 + m) return;
  if ((await readJSON(ASKED_URL)) === day) return;
  await writeJSON(ASKED_URL, day);
  await ask(state.text || {}, day, null);
}
self.addEventListener('periodicsync', event => {
  if (event.tag === 'lensy-reminder') event.waitUntil(maybeRemind());
});

self.addEventListener('notificationclick', event => {
  const data = event.notification.data || {};
  const day = isDate(data.date) ? data.date : today();
  event.notification.close();

  if (event.action === 'no') return;

  if (event.action === 'yes') {
    // Log the day without opening the app.
    event.waitUntil((async () => {
      const pending = (await readJSON(PENDING_URL)) || [];
      if (!pending.includes(day)) pending.push(day);
      await writeJSON(PENDING_URL, pending);                 // the app picks this up next time it runs
      if (data.token && CFG.supabaseUrl && CFG.supabaseKey) { // and the account gets it right away
        try {
          await fetch(CFG.supabaseUrl + '/functions/v1/lensy', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'apikey': CFG.supabaseKey },
            body: JSON.stringify({ action: 'log', token: data.token })
          });
        } catch (e) {}
      }
      const open = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
      open.forEach(c => c.postMessage({ type: 'lensy-pending' }));
    })());
    return;
  }

  // Tap on the notification itself: bring the app forward.
  event.waitUntil((async () => {
    const open = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    if (open.length) return open[0].focus();
    return self.clients.openWindow('./');
  })());
});
