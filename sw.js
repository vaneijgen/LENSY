const CACHE = "lensy-v1";
const ASSETS = [
  "/",
  "/index.html",
  "/manifest.json"
];

// Install: cache core assets
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activate: remove old caches
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: cache-first, fallback to network
self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});

// Notification action handler (Yes / No buttons)
self.addEventListener("notificationclick", e => {
  e.notification.close();
  if (e.action === "yes") {
    // Post message to all open clients to log today
    e.waitUntil(
      self.clients.matchAll({ type: "window" }).then(clients => {
        if (clients.length > 0) {
          clients[0].postMessage({ type: "LOG_TODAY" });
          clients[0].focus();
        } else {
          // App not open — store a flag in IndexedDB to log on next open
          self.clients.openWindow("/");
        }
      })
    );
  }
  // "No" action: just close the notification, nothing to log
});const CACHE = "lenstrack-v1";
const ASSETS = [
  "/",
  "/index.html",
  "/manifest.json"
];

// Install: cache core assets
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activate: remove old caches
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: cache-first, fallback to network
self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});

// Notification action handler (Yes / No buttons)
self.addEventListener("notificationclick", e => {
  e.notification.close();
  if (e.action === "yes") {
    // Post message to all open clients to log today
    e.waitUntil(
      self.clients.matchAll({ type: "window" }).then(clients => {
        if (clients.length > 0) {
          clients[0].postMessage({ type: "LOG_TODAY" });
          clients[0].focus();
        } else {
          // App not open — store a flag in IndexedDB to log on next open
          self.clients.openWindow("/");
        }
      })
    );
  }
  // "No" action: just close the notification, nothing to log
});
