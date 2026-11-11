(() => {
'use strict';

const CFG = self.LENSY_CONFIG || {};
const KEY = 'lensy_v1';
const SITE = location.origin + location.pathname.replace(/index\.html$/, '');
const TYPES = { daily: 1, weekly: 7, biweekly: 14, monthly: 30 };
const app = document.getElementById('app');
const tabsEl = document.getElementById('tabs');
const modalEl = document.getElementById('modal');

/* ---------- text ---------- */
const TEXT = {
  en: {
    'tab.today': 'Today', 'tab.calendar': 'Calendar', 'tab.lenses': 'Lenses', 'tab.settings': 'Settings',
    'left': 'left', 'days.left': '{n} days left', 'day.left': '1 day left', 'until': 'until {d}',
    'daily.fresh': 'A fresh pair today', 'daily.worn': 'Worn today', 'daily.wornSub': 'Throw this pair away tonight',
    'over': 'Time for a new pair', 'over.eye': 'Replace this lens', 'over.sub': 'This pair has reached its limit',
    'lastday': 'Last day', 'lastday.sub': 'Replace tomorrow',
    'log': 'I’m wearing lenses today', 'logged': 'Worn today', 'undo': 'Tap again to undo',
    'newpair': 'Start a new pair', 'newlens.left': 'New left lens', 'newlens.right': 'New right lens',
    'eye.left': 'Left eye', 'eye.right': 'Right eye',
    'new.title': 'Start a new pair?', 'new.text': 'The countdown restarts from today. Your wear history stays.', 'new.ok': 'Start new pair',
    'cancel': 'Cancel',
    'cal.worn': 'Worn', 'cal.last': 'Last day of this pair', 'cal.until': 'Lasts until {d}', 'cal.ifdaily': ', if you wear them every day',
    'cal.due': 'Due for replacement', 'cal.month': 'This month', 'cal.all': 'All time', 'cal.streak': 'Current streak',
    'n.days': '{n} days', 'n.day': '1 day',
    'cal.export': 'Add wear days to calendar', 'cal.google': 'Add reminder to Google Calendar',
    'ics.worn': 'Contact lenses worn', 'ics.replace': 'Replace contact lenses',
    'lens.schedule': 'Replacement schedule', 'type.daily': 'Daily', 'type.weekly': 'Weekly', 'type.biweekly': '2-week', 'type.monthly': 'Monthly',
    'lens.opened': 'Opened on', 'lens.details': 'Details (optional)', 'f.brand': 'Brand', 'f.power': 'Power', 'f.bc': 'Base curve', 'f.dia': 'Diameter', 'f.notes': 'Notes',
    'ph.notes': 'For dry eyes',
    'set.account': 'Account', 'set.signin': 'Sign in or create account', 'set.signin.note': 'Keeps your data safe and the same on every device.',
    'set.nocloud': 'Accounts are not set up yet. See setup/SETUP.md.',
    'set.export': 'Download my data', 'set.signout': 'Sign out', 'set.delete': 'Delete account',
    'set.syncerr': 'Could not sync. LENSY retries when you are online.',
    'set.dual': 'Track each eye separately', 'set.count': 'Count down by', 'count.worn': 'Days worn', 'count.calendar': 'Days since opening',
    'set.count.note': 'Most makers count from the day you open a pair. Ask your optician.',
    'set.reminder': 'Daily reminder', 'set.ask': 'Ask if I wore my lenses', 'set.time': 'Time', 'set.test': 'Send a test notification', 'set.sent': 'Sent. Check your notifications.',
    'rem.cloud': 'Answer Yes or No right from the notification on Android.',
    'rem.local': 'Sign in to get the reminder while the app is closed.',
    'rem.ios': 'On iPhone, add LENSY to your home screen first (Share, then Add to Home Screen) and open it from there.',
    'rem.unsupported': 'This browser can’t show notifications.',
    'rem.blocked': 'Notifications are blocked for LENSY. Allow them in your browser’s site settings, then try again.',
    'rem.fail': 'Could not register this device for reminders. Try again later.',
    'rem.testfail': 'The test could not be sent. Check that notifications are allowed for LENSY.',
    'notif.body': 'Did you wear your lenses today?', 'yes': 'Yes', 'no': 'No',
    'set.language': 'Language', 'lang.auto': 'Automatic', 'set.look': 'Appearance', 'look.auto': 'Automatic', 'look.light': 'Light', 'look.dark': 'Dark',
    'set.erase': 'Erase all data', 'erase.title': 'Erase all data?', 'erase.text': 'This removes your wear history, lens details and settings from this device. It can’t be undone.', 'erase.ok': 'Erase everything',
    'out.title': 'Sign out?', 'out.text': 'Your data stays in your account and is removed from this device.',
    'del.title': 'Delete your account?', 'del.text': 'Your account and everything stored in it are deleted for good.', 'del.ok': 'Delete account', 'del.fail': 'Could not delete the account. Try again later.',
    'foot': 'Follow your optician’s advice on wear time.',
    'w.lead': 'Know when it’s time for a new pair.', 'w.which': 'Which lenses do you wear?', 'w.start': 'Get started', 'w.have': 'I already have an account',
    'a.in': 'Sign in', 'a.up': 'Create account', 'a.reset': 'Reset password', 'a.google': 'Continue with Google', 'a.apple': 'Continue with Apple', 'a.or': 'or',
    'a.email': 'Email', 'a.pass': 'Password', 'a.newpass': 'New password (8 characters or more)',
    'a.toUp': 'Create an account', 'a.toIn': 'I have an account', 'a.forgot': 'Forgot password?', 'a.send': 'Send reset link',
    'a.bad': 'Wrong email or password.', 'a.short': 'Use at least 8 characters.', 'a.invalid': 'Enter a valid email address.',
    'a.confirm': 'Check your inbox and confirm your email, then sign in.', 'a.sent': 'If that address has an account, a reset link is on its way.',
    'a.err': 'Something went wrong. Try again.', 'a.setpass': 'Choose a new password', 'a.save': 'Save password', 'a.saved': 'Password saved.',
    'f.stock': 'Spare pairs at home', 'f.stock.lens': 'Spare lenses at home', 'f.stock.daily': 'Days of lenses at home',
    'stock.n': '{n} spare pairs at home', 'stock.1': '1 spare pair at home', 'stock.0': 'No spare pair at home',
    'stockl.n': '{n} spare lenses at home', 'stockl.1': '1 spare lens at home', 'stockl.0': 'No spare lens at home',
    'stockd.n': 'Lenses for {n} more days', 'stockd.1': 'Lenses for 1 more day', 'stockd.0': 'No lenses left at home',
    'shop.order': 'Order again', 'shop.ad': 'Advertisement. LENSY may earn a commission. Only your lens brand is passed on.',
    'privacy': 'Privacy notice', 'set.privacy': 'Privacy and legal', 'foot.med': 'LENSY is not a medical device and gives no medical advice.',
    'c.title': 'Store your data in your account?',
    'c.text': 'Your wear days and lens details are health-related data. With your permission LENSY stores them in your account, on servers in the EU, only to show them on your devices and to send your reminder. You can withdraw this at any time by deleting your account. You confirm that you are 13 or older.',
    'c.ok': 'I agree', 'c.no': 'No, sign me out'
  },
  nl: {
    'tab.today': 'Vandaag', 'tab.calendar': 'Kalender', 'tab.lenses': 'Lenzen', 'tab.settings': 'Instellingen',
    'left': 'over', 'days.left': 'Nog {n} dagen', 'day.left': 'Nog 1 dag', 'until': 'tot {d}',
    'daily.fresh': 'Vandaag een vers paar', 'daily.worn': 'Vandaag gedragen', 'daily.wornSub': 'Gooi dit paar vanavond weg',
    'over': 'Tijd voor een nieuw paar', 'over.eye': 'Vervang deze lens', 'over.sub': 'Dit paar is aan vervanging toe',
    'lastday': 'Laatste dag', 'lastday.sub': 'Vervang morgen',
    'log': 'Ik draag vandaag lenzen', 'logged': 'Vandaag gedragen', 'undo': 'Tik opnieuw om ongedaan te maken',
    'newpair': 'Nieuw paar starten', 'newlens.left': 'Nieuwe linkerlens', 'newlens.right': 'Nieuwe rechterlens',
    'eye.left': 'Linkeroog', 'eye.right': 'Rechteroog',
    'new.title': 'Nieuw paar starten?', 'new.text': 'Het aftellen begint opnieuw vanaf vandaag. Je geschiedenis blijft bewaard.', 'new.ok': 'Nieuw paar starten',
    'cancel': 'Annuleren',
    'cal.worn': 'Gedragen', 'cal.last': 'Laatste dag van dit paar', 'cal.until': 'Gaat mee tot {d}', 'cal.ifdaily': ', als je ze elke dag draagt',
    'cal.due': 'Aan vervanging toe', 'cal.month': 'Deze maand', 'cal.all': 'Totaal', 'cal.streak': 'Huidige reeks',
    'n.days': '{n} dagen', 'n.day': '1 dag',
    'cal.export': 'Draagdagen naar agenda', 'cal.google': 'Herinnering in Google Agenda',
    'ics.worn': 'Lenzen gedragen', 'ics.replace': 'Lenzen vervangen',
    'lens.schedule': 'Vervangschema', 'type.daily': 'Dag', 'type.weekly': 'Week', 'type.biweekly': '2 weken', 'type.monthly': 'Maand',
    'lens.opened': 'Geopend op', 'lens.details': 'Details (optioneel)', 'f.brand': 'Merk', 'f.power': 'Sterkte', 'f.bc': 'Basiscurve', 'f.dia': 'Diameter', 'f.notes': 'Notities',
    'ph.notes': 'Voor droge ogen',
    'set.account': 'Account', 'set.signin': 'Inloggen of account maken', 'set.signin.note': 'Houdt je gegevens veilig en gelijk op elk toestel.',
    'set.nocloud': 'Accounts zijn nog niet ingesteld. Zie setup/SETUP.md.',
    'set.export': 'Mijn gegevens downloaden', 'set.signout': 'Uitloggen', 'set.delete': 'Account verwijderen',
    'set.syncerr': 'Synchroniseren lukte niet. LENSY probeert opnieuw zodra je online bent.',
    'set.dual': 'Elk oog apart bijhouden', 'set.count': 'Aftellen op', 'count.worn': 'Draagdagen', 'count.calendar': 'Dagen sinds openen',
    'set.count.note': 'De meeste fabrikanten tellen vanaf de dag van openen. Vraag het je opticien.',
    'set.reminder': 'Dagelijkse herinnering', 'set.ask': 'Vraag of ik lenzen droeg', 'set.time': 'Tijdstip', 'set.test': 'Testmelding sturen', 'set.sent': 'Verstuurd. Kijk bij je meldingen.',
    'rem.cloud': 'Op Android antwoord je met Ja of Nee in de melding zelf.',
    'rem.local': 'Log in om de herinnering ook te krijgen als de app dicht is.',
    'rem.ios': 'Zet LENSY op iPhone eerst op je beginscherm (Deel, dan Zet op beginscherm) en open de app van daaruit.',
    'rem.unsupported': 'Deze browser kan geen meldingen tonen.',
    'rem.blocked': 'Meldingen zijn geblokkeerd voor LENSY. Sta ze toe in de site-instellingen van je browser en probeer opnieuw.',
    'rem.fail': 'Dit toestel kon niet worden aangemeld voor herinneringen. Probeer het later opnieuw.',
    'rem.testfail': 'De testmelding kon niet worden verstuurd. Controleer of meldingen zijn toegestaan voor LENSY.',
    'notif.body': 'Heb je vandaag lenzen gedragen?', 'yes': 'Ja', 'no': 'Nee',
    'set.language': 'Taal', 'lang.auto': 'Automatisch', 'set.look': 'Weergave', 'look.auto': 'Automatisch', 'look.light': 'Licht', 'look.dark': 'Donker',
    'set.erase': 'Alle gegevens wissen', 'erase.title': 'Alle gegevens wissen?', 'erase.text': 'Je draaggeschiedenis, lensgegevens en instellingen worden van dit toestel verwijderd. Dit kan niet ongedaan worden gemaakt.', 'erase.ok': 'Alles wissen',
    'out.title': 'Uitloggen?', 'out.text': 'Je gegevens blijven in je account en worden van dit toestel verwijderd.',
    'del.title': 'Account verwijderen?', 'del.text': 'Je account en alles wat erin is opgeslagen worden definitief verwijderd.', 'del.ok': 'Account verwijderen', 'del.fail': 'Het account kon niet worden verwijderd. Probeer het later opnieuw.',
    'foot': 'Volg het advies van je opticien over de draagtijd.',
    'w.lead': 'Weet wanneer het tijd is voor een nieuw paar.', 'w.which': 'Welke lenzen draag je?', 'w.start': 'Aan de slag', 'w.have': 'Ik heb al een account',
    'a.in': 'Inloggen', 'a.up': 'Account maken', 'a.reset': 'Wachtwoord herstellen', 'a.google': 'Doorgaan met Google', 'a.apple': 'Doorgaan met Apple', 'a.or': 'of',
    'a.email': 'E-mailadres', 'a.pass': 'Wachtwoord', 'a.newpass': 'Nieuw wachtwoord (minstens 8 tekens)',
    'a.toUp': 'Account maken', 'a.toIn': 'Ik heb een account', 'a.forgot': 'Wachtwoord vergeten?', 'a.send': 'Herstellink sturen',
    'a.bad': 'E-mailadres of wachtwoord klopt niet.', 'a.short': 'Gebruik minstens 8 tekens.', 'a.invalid': 'Vul een geldig e-mailadres in.',
    'a.confirm': 'Bevestig je e-mailadres via de mail die we stuurden en log daarna in.', 'a.sent': 'Als er een account bij dat adres hoort, is er een herstellink onderweg.',
    'a.err': 'Er ging iets mis. Probeer het opnieuw.', 'a.setpass': 'Kies een nieuw wachtwoord', 'a.save': 'Wachtwoord opslaan', 'a.saved': 'Wachtwoord opgeslagen.',
    'f.stock': 'Reserveparen in huis', 'f.stock.lens': 'Reservelenzen in huis', 'f.stock.daily': 'Dagen lenzen in huis',
    'stock.n': '{n} reserveparen in huis', 'stock.1': '1 reservepaar in huis', 'stock.0': 'Geen reservepaar in huis',
    'stockl.n': '{n} reservelenzen in huis', 'stockl.1': '1 reservelens in huis', 'stockl.0': 'Geen reservelens in huis',
    'stockd.n': 'Nog lenzen voor {n} dagen', 'stockd.1': 'Nog lenzen voor 1 dag', 'stockd.0': 'Geen lenzen meer in huis',
    'shop.order': 'Opnieuw bestellen', 'shop.ad': 'Advertentie. LENSY kan een commissie krijgen. Alleen je lensmerk wordt doorgegeven.',
    'privacy': 'Privacyverklaring', 'set.privacy': 'Privacy en juridisch', 'foot.med': 'LENSY is geen medisch hulpmiddel en geeft geen medisch advies.',
    'c.title': 'Je gegevens in je account bewaren?',
    'c.text': 'Je draagdagen en lensgegevens zijn gezondheidsgerelateerde gegevens. Met jouw toestemming bewaart LENSY ze in je account, op servers in de EU, enkel om ze op je toestellen te tonen en je herinnering te sturen. Je kan dit altijd intrekken door je account te verwijderen. Je bevestigt dat je 13 jaar of ouder bent.',
    'c.ok': 'Ik ga akkoord', 'c.no': 'Nee, log me uit'
  }
};
function lang() { return S.lang === 'en' || S.lang === 'nl' ? S.lang : (/^nl/i.test(navigator.language || '') ? 'nl' : 'en'); }
function locale() { return lang() === 'nl' ? 'nl-BE' : 'en-GB'; }
function t(k, v) {
  let s = TEXT[lang()][k]; if (s == null) s = TEXT.en[k] || k;
  return v ? s.replace(/\{(\w+)\}/g, (_, n) => v[n]) : s;
}

/* ---------- dates (always local time) ---------- */
const pad = n => String(n).padStart(2, '0');
const iso = d => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
const parse = s => { const p = s.split('-').map(Number); return new Date(p[0], p[1] - 1, p[2]); };
const today = () => iso(new Date());
const addDays = (s, n) => { const d = parse(s); d.setDate(d.getDate() + n); return iso(d); };
const diffDays = (a, b) => Math.round((parse(b) - parse(a)) / 864e5);
const fmt = (s, o) => new Intl.DateTimeFormat(locale(), o).format(parse(s));
const fmtShort = s => fmt(s, { weekday: 'short', day: 'numeric', month: 'short' });
const isDate = s => typeof s === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(s) && !isNaN(parse(s));
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const nDays = n => n === 1 ? t('n.day') : t('n.days', { n });

/* ---------- state ---------- */
function blankEye() { return { type: 'monthly', start: today(), stock: null, brand: '', power: '', bc: '', dia: '', notes: '' }; }
function defaults() {
  return { eyes: { left: blankEye(), right: blankEye() }, dual: false, log: {}, count: 'worn', notif: { on: false, time: '20:00' },
    theme: 'auto', lang: 'auto', onboarded: false, updated: 0, uid: null, fresh: false, ops: [], consent: null };
}
function cleanEye(e) {
  const b = blankEye(); if (!e || typeof e !== 'object') return b;
  if (TYPES[e.type]) b.type = e.type;
  if (isDate(e.start) && e.start <= addDays(today(), 1)) b.start = e.start;
  if (Number.isInteger(e.stock) && e.stock >= 0 && e.stock <= 999) b.stock = e.stock;
  ['brand', 'power', 'bc', 'dia', 'notes'].forEach(k => { if (typeof e[k] === 'string') b[k] = e[k].slice(0, 120); });
  return b;
}
// Copies only known, well-formed settings from untrusted input (storage or server) onto d.
function applySettings(raw, d) {
  d = d || S; if (!raw || typeof raw !== 'object') return d;
  d.eyes = { left: cleanEye(raw.eyes && raw.eyes.left), right: cleanEye(raw.eyes && raw.eyes.right) };
  d.dual = !!raw.dual;
  d.count = raw.count === 'calendar' ? 'calendar' : 'worn';
  d.notif = { on: !!(raw.notif && raw.notif.on), time: raw.notif && /^([01]\d|2[0-3]):[0-5]\d$/.test(raw.notif.time || '') ? raw.notif.time : '20:00' };
  d.theme = raw.theme === 'light' || raw.theme === 'dark' ? raw.theme : 'auto';
  d.lang = raw.lang === 'en' || raw.lang === 'nl' ? raw.lang : 'auto';
  return d;
}
function settingsBlob() { return { eyes: S.eyes, dual: S.dual, count: S.count, notif: S.notif, theme: S.theme, lang: S.lang, onboarded: S.onboarded }; }
function load() {
  const d = defaults(); let raw = null;
  try { raw = JSON.parse(localStorage.getItem(KEY)); } catch (e) {}
  if (!raw || typeof raw !== 'object') return d;
  applySettings(raw, d);
  if (raw.log && typeof raw.log === 'object') Object.keys(raw.log).forEach(k => { if (isDate(k) && raw.log[k]) d.log[k] = true; });
  d.onboarded = raw.onboarded !== false;
  d.updated = Number(raw.updated) || 0;
  d.uid = typeof raw.uid === 'string' ? raw.uid : null;
  d.fresh = !!raw.fresh;
  d.consent = typeof raw.consent === 'string' && !isNaN(Date.parse(raw.consent)) ? raw.consent : null;
  if (Array.isArray(raw.ops)) d.ops = raw.ops.filter(o => o && isDate(o.d)).map(o => ({ d: o.d, on: !!o.on }));
  return d;
}
let S = load();
const ui = { tab: 'today', side: 'left', month: null, modal: null, msg: '', sent: false, syncErr: false };
let ringPrev = {};

function persist() {
  try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {}
  mirror();
}
// A settings change: remember when, save, and send to the account if signed in.
let pushTimer = 0;
function touch() {
  S.updated = Date.now(); persist();
  if (sb && user) { clearTimeout(pushTimer); pushTimer = setTimeout(() => pushSettings().then(() => { ui.syncErr = false; }, () => { ui.syncErr = true; }), 700); }
}

/* ---------- lens maths ---------- */
const sides = () => S.dual ? ['left', 'right'] : ['left'];
function stats(side) {
  const eye = S.eyes[side], max = TYPES[eye.type], td = today(), wornToday = !!S.log[td];
  const r = { type: eye.type, max, daily: eye.type === 'daily', last: null, tone: 'ok', lastToday: false, over: false };
  if (r.daily) { r.used = wornToday ? 1 : 0; r.left = 1 - r.used; r.frac = r.left; return r; }
  if (S.count === 'calendar') {
    r.used = Math.max(0, diffDays(eye.start, td));
    r.over = r.used >= max;
    if (!r.over) r.last = addDays(eye.start, max - 1);
  } else {
    r.used = Object.keys(S.log).filter(d => d >= eye.start && d <= td).length;
    r.lastToday = r.used === max && wornToday;
    r.over = r.used > max || (r.used === max && !wornToday);
    if (r.used < max) r.last = addDays(td, max - r.used - (wornToday ? 0 : 1));
  }
  r.left = Math.max(0, max - r.used);
  r.frac = r.left / max;
  r.tone = r.over ? 'over' : (r.lastToday || r.frac <= .25) ? 'warn' : 'ok';
  return r;
}
function streak() {
  let d = today(), n = 0;
  if (!S.log[d]) d = addDays(d, -1);
  while (S.log[d]) { n++; d = addDays(d, -1); }
  return n;
}

/* ---------- stock and reordering ---------- */
function stockLow(side) { const e = S.eyes[side]; return e.stock != null && e.stock <= (e.type === 'daily' ? 10 : 1); }
function stockText(side) {
  const e = S.eyes[side], n = e.stock, k = e.type === 'daily' ? 'stockd' : S.dual ? 'stockl' : 'stock';
  return (S.dual ? t('eye.' + side) + ': ' : '') + t(k + '.' + (n === 0 ? '0' : n === 1 ? '1' : 'n'), { n });
}
// Link to the shop set in config.js. Only the brand name goes into the address, and only when tapped.
function shopLink(side) {
  const u = CFG.shopUrl, brand = (S.eyes[side].brand || '').trim();
  if (typeof u !== 'string' || !/^https:\/\/[^\s"'<>]+$/.test(u) || u.indexOf('{brand}') < 0 || !brand) return '';
  return esc(u.replace('{brand}', encodeURIComponent(brand)));
}
function shopBlock(side) {
  const link = shopLink(side); if (!link) return '';
  return `<a class="link" href="${link}" target="_blank" rel="sponsored noopener noreferrer">${S.dual ? t('eye.' + side) + ': ' : ''}${t('shop.order')}</a>`;
}

/* ---------- pieces ---------- */
function ring(id, st, big) {
  const size = big ? 232 : 138, sw = big ? 22 : 15, r = (size - sw) / 2, C = 2 * Math.PI * r, c = size / 2, pct = Math.round(st.frac * 100);
  return `<div class="ring ${big ? 'lg' : 'sm'} ${st.tone}" role="img" aria-label="${pct}% ${t('left')}">`
    + `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">`
    + `<defs><linearGradient id="g-${id}" x1="0" y1="0" x2="1" y2="1"><stop class="s1" offset="0"/><stop class="s2" offset="1"/></linearGradient></defs>`
    + `<circle class="track" cx="${c}" cy="${c}" r="${r}" fill="none" stroke-width="${sw}"/>`
    + `<circle class="prog${st.frac <= 0 ? ' empty' : ''}" data-ring="${id}" data-frac="${st.frac}" data-c="${C}" cx="${c}" cy="${c}" r="${r}" fill="none" stroke="url(#g-${id})" stroke-width="${sw}" stroke-linecap="round" stroke-dasharray="${C}" stroke-dashoffset="${C}"/>`
    + `</svg><div class="ring-c round"><strong>${pct}<small>%</small></strong><span>${t('left')}</span></div></div>`;
}
function say(st, side) {
  let b, s = '', cls = '';
  if (st.daily) { b = t(st.used ? 'daily.worn' : 'daily.fresh'); s = st.used ? t('daily.wornSub') : ''; }
  else if (st.over) { b = t(side ? 'over.eye' : 'over'); s = side ? '' : t('over.sub'); cls = 'over'; }
  else if (st.lastToday) { b = t('lastday'); s = t('lastday.sub'); cls = 'warn'; }
  else { b = st.left === 1 ? t('day.left') : t('days.left', { n: st.left }); s = t('until', { d: fmtShort(st.last) }); cls = st.tone === 'warn' ? 'warn' : ''; }
  return `<p class="say ${cls}"><b>${b}</b>${s ? `<span>${s}</span>` : ''}</p>`;
}
const seg = (act, opts, cur, extra) => `<div class="seg ${extra || ''}" role="group">` + opts.map(o => `<button data-act="${act}" data-val="${o[0]}" aria-pressed="${o[0] === cur}">${o[1]}</button>`).join('') + '</div>';
const sw = (act, on, label) => `<button class="switch" role="switch" aria-checked="${on}" aria-label="${esc(label)}" data-act="${act}"></button>`;
const head = (title, sub) => `<header class="head">${sub ? `<p class="date">${sub}</p>` : ''}<h1>${title}</h1></header>`;
const CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
const typeSeg = cur => seg('type', Object.keys(TYPES).map(k => [k, t('type.' + k)]), cur);
const openedRow = e => e.type === 'daily' ? '' : `<label class="row"><span class="k">${t('lens.opened')}</span><input type="date" data-field="start" value="${e.start}" max="${today()}"></label>`;

/* ---------- views ---------- */
function vWelcome() {
  const e = S.eyes.left;
  return `<section class="welcome"><img src="icon-192.png" alt="" width="84" height="84"><h1>LENSY</h1><p class="lead">${t('w.lead')}</p>`
    + `<section class="group"><h2>${t('w.which')}</h2><div class="list"><div class="row stack">${typeSeg(e.type)}</div>${openedRow(e)}`
    + `<label class="row"><span class="k">${t('f.brand')}</span><input type="text" autocomplete="off" data-field="brand" value="${esc(e.brand)}" placeholder="Acuvue Oasys" maxlength="120"></label></div></section>`
    + `<button class="btn primary" data-act="start">${t('w.start')}</button>`
    + (sb ? `<button class="link" data-act="auth">${t('w.have')}</button>` : '')
    + `<p class="foot"><a href="privacy.html">${t('privacy')}</a></p></section>`;
}

function vToday() {
  const td = today(), worn = !!S.log[td];
  let h = head(t('tab.today'), fmt(td, { weekday: 'long', day: 'numeric', month: 'long' }));
  const st = sides().map(stats);
  if (!S.dual) h += `<section class="card hero">${ring('left', st[0], true)}${say(st[0])}</section>`;
  else h += '<section class="card hero duo">' + ['left', 'right'].map((s, i) => `<div class="eye"><h2>${t('eye.' + s)}</h2>${ring(s, st[i], false)}${say(st[i], s)}</div>`).join('') + '</section>';

  const logBtn = worn
    ? `<button class="btn done" data-act="day" data-date="${td}" aria-pressed="true">${CHECK}${t('logged')}</button>`
    : `<button class="btn primary" data-act="day" data-date="${td}" aria-pressed="false">${t('log')}</button>`;
  const due = !S.dual && st[0].over;
  if (due) {
    // The pair is used up: starting a new one becomes the main action.
    h += `<button class="btn primary" data-act="newpair" data-side="left">${t('newpair')}</button>`;
    h += worn ? `<button class="btn done" data-act="day" data-date="${td}" aria-pressed="true">${CHECK}${t('logged')}</button>` : `<button class="link" data-act="day" data-date="${td}">${t('log')}</button>`;
  } else {
    h += logBtn + (worn ? `<p class="hint">${t('undo')}</p>` : '');
    sides().forEach((s, i) => { if (!st[i].daily) h += `<button class="link" data-act="newpair" data-side="${s}">${S.dual ? t('newlens.' + s) : t('newpair')}</button>`; });
  }
  // Running low: say so once, quietly, with a way to reorder if a shop is set up.
  let shop = '';
  sides().forEach((s, i) => {
    const low = stockLow(s);
    if (low) h += `<p class="stockline">${stockText(s)}</p>`;
    if (low || (S.eyes[s].stock == null && (st[i].over || st[i].tone === 'warn'))) shop += shopBlock(s);
  });
  if (shop) h += shop + `<p class="hint">${t('shop.ad')}</p>`;
  return h;
}

function vCalendar() {
  const td = today(), now = new Date();
  if (!ui.month) ui.month = { y: now.getFullYear(), m: now.getMonth() };
  const y = ui.month.y, m = ui.month.m, first = new Date(y, m, 1);
  const offset = (first.getDay() + 6) % 7, n = new Date(y, m + 1, 0).getDate();
  const lasts = {}, notes = [];
  sides().forEach(s => {
    const st = stats(s), who = S.dual ? t('eye.' + s) + ': ' : '';
    if (st.daily) return;
    if (st.over) notes.push(`<p class="note warn">${who}${t('cal.due')}.</p>`);
    else if (st.last) { lasts[st.last] = 1; notes.push(`<p class="note">${who}${t('cal.until', { d: fmt(st.last, { weekday: 'long', day: 'numeric', month: 'long' }) })}${S.count === 'worn' ? t('cal.ifdaily') : ''}.</p>`); }
  });
  let h = head(t('tab.calendar'));
  h += `<section class="card cal"><div class="cal-nav"><h2>${new Intl.DateTimeFormat(locale(), { month: 'long', year: 'numeric' }).format(first)}</h2><div>`
    + '<button data-act="month" data-val="-1" aria-label="&lt;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 5.5L8 12l6.5 6.5"/></svg></button>'
    + '<button data-act="month" data-val="1" aria-label="&gt;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 5.5L16 12l-6.5 6.5"/></svg></button>'
    + '</div></div><div class="grid">';
  for (let i = 0; i < 7; i++) h += `<span class="wd" aria-hidden="true">${new Intl.DateTimeFormat(locale(), { weekday: 'narrow' }).format(new Date(2024, 0, 1 + i))}</span>`;
  for (let b = 0; b < offset; b++) h += '<span class="blank"></span>';
  let count = 0;
  for (let d = 1; d <= n; d++) {
    const ds = y + '-' + pad(m + 1) + '-' + pad(d), w = !!S.log[ds], fut = ds > td;
    if (w) count++;
    h += `<button data-act="day" data-date="${ds}"${fut ? ' disabled' : ''} class="${w ? 'is-worn ' : ''}${ds === td ? 'is-today ' : ''}${fut ? 'is-future ' : ''}${lasts[ds] && !w ? 'is-last' : ''}" aria-label="${fmt(ds, { day: 'numeric', month: 'long' })}${w ? ', ' + t('cal.worn') : ''}${lasts[ds] ? ', ' + t('cal.last') : ''}"${fut ? '' : ` aria-pressed="${w}"`}><span class="dot">${d}</span></button>`;
  }
  h += `</div><div class="legend"><span><i class="a"></i>${t('cal.worn')}</span><span><i class="b"></i>${t('cal.last')}</span></div></section>`;
  if (notes.length) h += `<section class="group">${notes.join('')}</section>`;
  h += '<section class="group"><div class="list">'
    + `<div class="row"><span class="k">${t('cal.month')}</span><span class="v">${nDays(count)}</span></div>`
    + `<div class="row"><span class="k">${t('cal.all')}</span><span class="v">${nDays(Object.keys(S.log).length)}</span></div>`
    + `<div class="row"><span class="k">${t('cal.streak')}</span><span class="v">${nDays(streak())}</span></div></div></section>`;
  const g = googleLink();
  h += `<section class="group"><div class="list"><button class="row action" data-act="ics"><span class="k">${t('cal.export')}</span></button>`
    + (g ? `<a class="row action" href="${g}" target="_blank" rel="noopener noreferrer"><span class="k">${t('cal.google')}</span></a>` : '') + '</div></section>';
  return h;
}

function vLenses() {
  const side = S.dual ? ui.side : 'left', e = S.eyes[side];
  let h = head(t('tab.lenses'));
  if (S.dual) h += seg('side', [['left', t('eye.left')], ['right', t('eye.right')]], side, 'top');
  h += `<section class="group"><h2>${t('lens.schedule')}</h2><div class="list"><div class="row stack">${typeSeg(e.type)}</div>${openedRow(e)}`
    + `<div class="row"><span class="k">${t(e.type === 'daily' ? 'f.stock.daily' : S.dual ? 'f.stock.lens' : 'f.stock')}</span><span class="stepper">`
    + `<button data-act="stock" data-val="-1" aria-label="\u2212"${e.stock == null ? ' disabled' : ''}>\u2212</button><b class="round" aria-live="polite">${e.stock == null ? '\u2013' : e.stock}</b><button data-act="stock" data-val="1" aria-label="+">+</button></span></div></div></section>`;
  h += `<section class="group"><h2>${t('lens.details')}</h2><div class="list">`;
  [['brand', 'Acuvue Oasys', 'text'], ['power', '−2.50', 'text'], ['bc', '8.5', 'decimal'], ['dia', '14.0', 'decimal'], ['notes', t('ph.notes'), 'text']].forEach(f => {
    h += `<label class="row"><span class="k">${t('f.' + f[0])}</span><input type="text" inputmode="${f[2]}" autocomplete="off" data-field="${f[0]}" value="${esc(e[f[0]])}" placeholder="${esc(f[1])}" maxlength="120"></label>`;
  });
  h += '</div></section>';
  const link = shopLink(side);
  if (link) h += `<section class="group"><div class="list"><a class="row action" href="${link}" target="_blank" rel="sponsored noopener noreferrer"><span class="k">${t('shop.order')}</span></a></div><p class="note">${t('shop.ad')}</p></section>`;
  return h;
}

function vSettings() {
  let h = head(t('tab.settings'));
  h += `<section class="group"><h2>${t('set.account')}</h2>`;
  if (!sb) h += `<p class="note">${t('set.nocloud')}</p>`;
  else if (!user) h += `<div class="list"><button class="row action" data-act="auth"><span class="k">${t('set.signin')}</span></button></div><p class="note">${t('set.signin.note')}</p>`;
  else h += `<div class="list"><div class="row"><span class="k">${t('a.email')}</span><span class="v">${esc(user.email || '')}</span></div>`
    + `<button class="row action" data-act="export"><span class="k">${t('set.export')}</span></button>`
    + `<button class="row action" data-act="signout"><span class="k">${t('set.signout')}</span></button></div>`
    + (ui.syncErr ? `<p class="note warn">${t('set.syncerr')}</p>` : '');
  h += '</section>';

  h += `<section class="group"><div class="list"><div class="row"><span class="k">${t('set.dual')}</span>${sw('dual', S.dual, t('set.dual'))}</div></div></section>`;
  h += `<section class="group"><h2>${t('set.count')}</h2><div class="list"><div class="row stack">${seg('count', [['worn', t('count.worn')], ['calendar', t('count.calendar')]], S.count)}</div></div><p class="note">${t('set.count.note')}</p></section>`;

  h += `<section class="group"><h2>${t('set.reminder')}</h2><div class="list"><div class="row"><span class="k">${t('set.ask')}</span>${sw('notif', S.notif.on, t('set.reminder'))}</div>`;
  if (S.notif.on) h += `<label class="row"><span class="k">${t('set.time')}</span><input type="time" data-setting="time" value="${S.notif.time}"></label>`
    + `<button class="row action" data-act="test"><span class="k">${ui.sent ? t('set.sent') : t('set.test')}</span></button>`;
  h += `</div><p class="note${ui.msg ? ' warn' : ''}">${ui.msg ? t(ui.msg) : t(sb && user ? 'rem.cloud' : sb ? 'rem.local' : 'rem.cloud')}</p></section>`;

  h += `<section class="group"><h2>${t('set.language')}</h2><div class="list"><div class="row stack">${seg('lang', [['auto', t('lang.auto')], ['nl', 'Nederlands'], ['en', 'English']], S.lang)}</div></div></section>`;
  h += `<section class="group"><h2>${t('set.look')}</h2><div class="list"><div class="row stack">${seg('theme', [['auto', t('look.auto')], ['light', t('look.light')], ['dark', t('look.dark')]], S.theme)}</div></div></section>`;
  h += `<section class="group"><div class="list">${user ? `<button class="row danger" data-act="delete">${t('set.delete')}</button>` : `<button class="row danger" data-act="clear">${t('set.erase')}</button>`}</div></section>`;
  h += `<section class="group"><div class="list"><a class="row action" href="privacy.html"><span class="k">${t('set.privacy')}</span></a></div></section>`;
  const op = CFG.operator && typeof CFG.operator.name === 'string' ? CFG.operator.name.trim() : '';
  return h + `<p class="foot">LENSY 3.1${op ? ' \u00b7 ' + esc(op) : ''}<br>${t('foot.med')}<br>${t('foot')}</p>`;
}

const VIEWS = { today: vToday, calendar: vCalendar, lenses: vLenses, settings: vSettings };

function render() {
  document.documentElement.lang = lang();
  tabsEl.hidden = !S.onboarded;
  app.innerHTML = S.onboarded ? VIEWS[ui.tab]() : vWelcome();
  tabsEl.querySelectorAll('button').forEach(b => {
    b.querySelector('span').textContent = t('tab.' + b.dataset.tab);
    if (b.dataset.tab === ui.tab) b.setAttribute('aria-current', 'page'); else b.removeAttribute('aria-current');
  });
  app.querySelectorAll('.prog').forEach(el => {
    const id = el.dataset.ring, f = +el.dataset.frac, C = +el.dataset.c, prev = ringPrev[id];
    el.style.strokeDashoffset = C * (1 - (prev == null ? 0 : prev));
    ringPrev[id] = f;
    requestAnimationFrame(() => requestAnimationFrame(() => { el.style.strokeDashoffset = C * (1 - f); }));
  });
}
// Re-render after background work, unless the user is typing in a field.
function softRender() {
  const a = document.activeElement;
  if (a && a.tagName === 'INPUT' && app.contains(a)) return;
  render();
}
function applyTheme() {
  const r = document.documentElement;
  if (S.theme === 'auto') r.removeAttribute('data-theme'); else r.setAttribute('data-theme', S.theme);
  document.querySelectorAll('meta[name=theme-color]').forEach((m, i) => {
    m.content = S.theme === 'dark' ? '#000000' : S.theme === 'light' ? '#F2F2F7' : (i ? '#000000' : '#F2F2F7');
  });
}

/* ---------- sheets ---------- */
function openModal(o) { ui.modal = o; renderModal(); }
function closeModal() { ui.modal = null; modalEl.innerHTML = ''; }
function renderModal() {
  const o = ui.modal; if (!o) { modalEl.innerHTML = ''; return; }
  let box = '';
  if (o.kind === 'confirm') {
    box = `<h2 id="sh-t">${o.title}</h2><p>${o.text}</p>`
      + `<button class="btn first ${o.destructive ? 'destructive' : 'primary'}" data-act="modal-ok">${o.ok}</button>`
      + `<button class="btn plain" data-act="modal-close">${t('cancel')}</button>`;
  } else if (o.kind === 'auth') {
    const m = o.mode;
    box = `<h2 id="sh-t">${t(m === 'up' ? 'a.up' : m === 'reset' ? 'a.reset' : 'a.in')}</h2>`;
    if (m !== 'reset') {
      box += `<button class="btn first outline" data-act="oauth" data-val="google">${t('a.google')}</button>`;
      if (CFG.apple) box += `<button class="btn outline" data-act="oauth" data-val="apple">${t('a.apple')}</button>`;
      box += `<div class="or">${t('a.or')}</div>`;
    }
    box += '<form id="auth-form" novalidate>'
      + `<input class="field" id="a-email" type="email" inputmode="email" autocomplete="email" autocapitalize="none" spellcheck="false" maxlength="254" placeholder="${t('a.email')}" aria-label="${t('a.email')}" value="${esc(o.email || '')}">`
      + (m === 'reset' ? '' : `<input class="field" id="a-pass" type="password" autocomplete="${m === 'up' ? 'new-password' : 'current-password'}" maxlength="128" placeholder="${t(m === 'up' ? 'a.newpass' : 'a.pass')}" aria-label="${t('a.pass')}">`)
      + `<p class="msg" id="a-msg" role="status"></p>`
      + `<button class="btn primary" type="submit" id="a-go">${t(m === 'up' ? 'a.up' : m === 'reset' ? 'a.send' : 'a.in')}</button></form>`
      + '<div class="links">'
      + `<button class="link" data-act="auth-mode" data-val="${m === 'in' ? 'up' : 'in'}">${t(m === 'in' ? 'a.toUp' : 'a.toIn')}</button>`
      + (m === 'in' ? `<button class="link" data-act="auth-mode" data-val="reset">${t('a.forgot')}</button>` : `<a class="link" href="privacy.html" target="_blank" rel="noopener">${t('privacy')}</a>`) + '</div>';
  } else if (o.kind === 'consent') {
    box = `<h2 id="sh-t">${t('c.title')}</h2><p>${t('c.text')}</p><p><a href="privacy.html" target="_blank" rel="noopener">${t('privacy')}</a></p>`
      + `<button class="btn first primary" data-act="consent-yes">${t('c.ok')}</button><button class="btn plain" data-act="consent-no">${t('c.no')}</button>`;
  } else if (o.kind === 'newpass') {
    box = `<h2 id="sh-t">${t('a.setpass')}</h2><form id="pass-form" novalidate>`
      + `<input class="field" id="a-pass" type="password" autocomplete="new-password" maxlength="128" placeholder="${t('a.newpass')}" aria-label="${t('a.newpass')}">`
      + `<p class="msg" id="a-msg" role="status"></p><button class="btn primary" type="submit" id="a-go">${t('a.save')}</button></form>`;
  }
  modalEl.innerHTML = `<div class="scrim" data-act="modal-close"><div class="sheet" role="dialog" aria-modal="true" aria-labelledby="sh-t"><div class="box">${box}</div></div></div>`;
  const f = modalEl.querySelector('input,[data-act="modal-ok"],[data-act="consent-yes"]'); if (f) f.focus();
}
const locked = () => !!ui.modal && (ui.modal.kind === 'newpass' || ui.modal.kind === 'consent'); // sheets that need an answer
function authMsg(key, bad) {
  const el = document.getElementById('a-msg'); if (!el) return;
  el.textContent = key ? t(key) : ''; el.classList.toggle('bad', !!bad);
}
function busy(on) { const b = document.getElementById('a-go'); if (b) b.disabled = on; }

/* ---------- account and sync ---------- */
let sb = null, user = null, syncing = false, opsTimer = 0, declined = false;
if (CFG.supabaseUrl && CFG.supabaseKey && self.supabase && self.supabase.createClient) {
  try {
    sb = self.supabase.createClient(CFG.supabaseUrl, CFG.supabaseKey, { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } });
    // Never call back into the client from inside this callback; defer instead.
    sb.auth.onAuthStateChange((event, session) => setTimeout(() => onAuth(event, session), 0));
  } catch (e) { sb = null; }
}
function onAuth(event, session) {
  const next = session ? session.user : null;
  if (event === 'PASSWORD_RECOVERY') { user = next; openModal({ kind: 'newpass' }); return; }
  if (next && (!user || user.id !== next.id)) {
    user = next;
    if (ui.modal && ui.modal.kind === 'auth') closeModal();
    render(); sync();
  } else if (!next && user) { user = null; if (declined) { declined = false; render(); } else wipeLocal(); }
}
function wipeLocal() {
  const keep = { lang: S.lang, theme: S.theme };
  try { localStorage.removeItem(KEY); localStorage.removeItem(KEY + '_asked'); } catch (e) {}
  S = defaults(); Object.assign(S, keep); ringPrev = {}; ui.month = null; ui.tab = 'today'; ui.msg = ''; ui.syncErr = false;
  persist(); applyTheme(); render(); window.scrollTo(0, 0);
}
function tz() { try { return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'; } catch (e) { return 'UTC'; } }

async function flushOps(uid) {
  if (!S.ops.length || !S.consent) return;
  const n = S.ops.length, m = {};
  S.ops.forEach(o => { m[o.d] = o.on; });
  const add = Object.keys(m).filter(d => m[d]), del = Object.keys(m).filter(d => !m[d]);
  if (add.length) { const { error } = await sb.from('wear_days').upsert(add.map(day => ({ user_id: uid, day })), { onConflict: 'user_id,day', ignoreDuplicates: true }); if (error) throw error; }
  if (del.length) { const { error } = await sb.from('wear_days').delete().eq('user_id', uid).in('day', del); if (error) throw error; }
  S.ops = S.ops.slice(n); persist();
}
async function pushSettings() {
  if (!sb || !user || !S.consent) return;
  const row = { user_id: user.id, data: settingsBlob(), reminder_on: S.notif.on, reminder_time: S.notif.time, tz: tz(), lang: lang(), consent_at: S.consent, consent_version: 1, updated_at: new Date(S.updated || Date.now()).toISOString() };
  const { error } = await sb.from('settings').upsert(row, { onConflict: 'user_id' });
  if (error) throw error;
}
async function sync() {
  if (!sb || !user || syncing) return;
  syncing = true; const uid = user.id;
  try {
    if (S.uid !== uid) {
      if (S.uid) { const keep = { lang: S.lang, theme: S.theme }; S = defaults(); Object.assign(S, keep); } // another account's data: start clean
      else Object.keys(S.log).forEach(d => S.ops.push({ d, on: true }));                                     // data from before signing in: bring it along
      S.uid = uid; S.fresh = true; S.consent = null; persist();
    }
    const { data: row, error } = await sb.from('settings').select('data,updated_at,consent_at').eq('user_id', uid).maybeSingle();
    if (error) throw error;
    if (row && row.consent_at) S.consent = row.consent_at;
    if (!S.consent) { openModal({ kind: 'consent' }); return; } // nothing is stored in the account before the user agrees
    await flushOps(uid);
    const days = {};
    for (let from = 0; ; from += 1000) {
      const { data, error: e2 } = await sb.from('wear_days').select('day').eq('user_id', uid).order('day').range(from, from + 999);
      if (e2) throw e2;
      data.forEach(r => { if (isDate(r.day)) days[r.day] = true; });
      if (data.length < 1000) break;
    }
    S.ops.forEach(o => { if (o.on) days[o.d] = true; else delete days[o.d]; });
    S.log = days;
    const remote = row ? Date.parse(row.updated_at) || 0 : 0;
    const hasData = row && row.data && typeof row.data === 'object' && row.data.eyes;
    if (hasData && (S.fresh || remote > S.updated)) { applySettings(row.data); S.updated = remote; S.onboarded = row.data.onboarded !== false; applyTheme(); }
    else if (!row || !row.consent_at || S.updated > remote) { if (!S.updated) S.updated = Date.now(); await pushSettings(); }
    S.fresh = false; ui.syncErr = false; persist();
    if (S.notif.on && 'Notification' in window && Notification.permission === 'granted') enablePush().catch(() => {});
  } catch (e) { ui.syncErr = true; }
  finally { syncing = false; softRender(); }
}
function agreeConsent() { S.consent = new Date().toISOString(); persist(); closeModal(); sync(); }
async function declineConsent() { // sign out again; what was on the device before signing in stays there
  closeModal(); S.uid = null; S.ops = []; S.fresh = false; S.consent = null; persist();
  declined = true;
  try { await sb.auth.signOut({ scope: 'local' }); } catch (e) {}
  if (user) { user = null; declined = false; render(); }
}
function queueOp(d, on) {
  if (!sb || !user) return;
  S.ops.push({ d, on }); persist();
  clearTimeout(opsTimer);
  opsTimer = setTimeout(() => flushOps(user.id).then(() => { ui.syncErr = false; }, () => { ui.syncErr = true; }), 400);
}

async function authSubmit() {
  const o = ui.modal, email = (document.getElementById('a-email').value || '').trim().toLowerCase();
  const passEl = document.getElementById('a-pass'), pass = passEl ? passEl.value : '';
  o.email = email;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return authMsg('a.invalid', true);
  if (o.mode === 'up' && pass.length < 8) return authMsg('a.short', true);
  authMsg(''); busy(true);
  try {
    if (o.mode === 'in') {
      const { error } = await sb.auth.signInWithPassword({ email, password: pass });
      if (error) authMsg(error.status === 400 ? 'a.bad' : 'a.err', true);
    } else if (o.mode === 'up') {
      const { data, error } = await sb.auth.signUp({ email, password: pass, options: { emailRedirectTo: SITE } });
      if (error) authMsg(/password/i.test(error.message || '') ? 'a.short' : 'a.err', true);
      else if (!data.session) authMsg('a.confirm');
    } else {
      await sb.auth.resetPasswordForEmail(email, { redirectTo: SITE });
      authMsg('a.sent'); // same answer whether or not the address exists
    }
  } catch (e) { authMsg('a.err', true); }
  busy(false);
}
async function passSubmit() {
  const pass = document.getElementById('a-pass').value;
  if (pass.length < 8) return authMsg('a.short', true);
  busy(true);
  try {
    const { error } = await sb.auth.updateUser({ password: pass });
    if (error) authMsg('a.err', true); else { closeModal(); render(); sync(); }
  } catch (e) { authMsg('a.err', true); }
  busy(false);
}
async function signOut() {
  try { await flushOps(user.id); } catch (e) {}
  await dropPush();
  try { await sb.auth.signOut({ scope: 'local' }); } catch (e) {}
  if (user) { user = null; wipeLocal(); }
}
async function deleteAccount() {
  try {
    const { data, error } = await sb.functions.invoke('lensy', { body: { action: 'delete' } });
    if (error || !data || !data.ok) throw error || new Error('failed');
    await dropPush();
    try { await sb.auth.signOut({ scope: 'local' }); } catch (e) {}
    user = null; wipeLocal();
  } catch (e) { ui.msg = ''; openModal({ kind: 'confirm', title: t('del.title'), text: t('del.fail'), ok: t('del.ok'), destructive: true, fn: deleteAccount }); }
}

/* ---------- calendar export ---------- */
function replaceDates() { return sides().map(s => { const st = stats(s); return st.last ? { side: s, date: addDays(st.last, 1) } : null; }).filter(Boolean); }
function googleLink() {
  const r = replaceDates()[0]; if (!r) return '';
  return 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=' + encodeURIComponent(t('ics.replace')) + '&dates=' + r.date.replace(/-/g, '') + '/' + addDays(r.date, 1).replace(/-/g, '');
}
function buildICS() {
  const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d+/, '');
  const L = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//LENSY//EN', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH'];
  const ev = (uid, from, to, sum, alarm) => {
    L.push('BEGIN:VEVENT', 'UID:' + uid + '@lensy', 'DTSTAMP:' + stamp, 'DTSTART;VALUE=DATE:' + from.replace(/-/g, ''), 'DTEND;VALUE=DATE:' + addDays(to, 1).replace(/-/g, ''), 'SUMMARY:' + sum, 'TRANSP:TRANSPARENT');
    if (alarm) L.push('BEGIN:VALARM', 'ACTION:DISPLAY', 'DESCRIPTION:' + sum, 'TRIGGER:PT9H', 'END:VALARM');
    L.push('END:VEVENT');
  };
  const days = Object.keys(S.log).sort();
  for (let i = 0; i < days.length; i++) { // back-to-back days become one event
    const a = days[i]; let b = a;
    while (i + 1 < days.length && days[i + 1] === addDays(b, 1)) b = days[++i];
    ev('worn-' + a, a, b, t('ics.worn'), false);
  }
  replaceDates().forEach(r => ev('replace-' + r.side + '-' + r.date, r.date, r.date, t('ics.replace') + (S.dual ? ' (' + t('eye.' + r.side) + ')' : ''), true));
  L.push('END:VCALENDAR');
  return L.join('\r\n');
}
function download(file) {
  const a = document.createElement('a'), u = URL.createObjectURL(file);
  a.href = u; a.download = file.name; document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(u), 4000);
}
function shareOrDownload(file) {
  if (navigator.canShare && navigator.canShare({ files: [file] })) navigator.share({ files: [file], title: 'LENSY' }).catch(e => { if (e && e.name !== 'AbortError') download(file); });
  else download(file);
}
function exportData() {
  const out = { app: 'LENSY', exported: new Date().toISOString(), account: user ? user.email : null, consentGiven: S.consent, lenses: S.eyes, wearDays: Object.keys(S.log).sort(), settings: { dual: S.dual, count: S.count, reminder: S.notif, language: S.lang, appearance: S.theme } };
  download(new File([JSON.stringify(out, null, 2)], 'lensy-data.json', { type: 'application/json' }));
}

/* ---------- reminders ---------- */
const canSW = 'serviceWorker' in navigator && /^https?:$/.test(location.protocol);
if (canSW) navigator.serviceWorker.register('./sw.js').catch(() => {});
// The active service worker, or null if there is none within a few seconds (never hangs).
function getReg() {
  if (!canSW) return Promise.resolve(null);
  return Promise.race([navigator.serviceWorker.ready, new Promise(r => setTimeout(() => r(null), 3000))]).catch(() => null);
}
const STATE_URL = new URL('./__lensy_state', location.href).href;
const PENDING_URL = new URL('./__lensy_pending', location.href).href;
const server = () => !!(sb && user && S.consent && CFG.vapidPublicKey);

function mirror() { // lets the service worker see what it needs for a reminder
  if (!canSW || !window.caches) return;
  const body = JSON.stringify({ notif: S.notif, log: S.log, server: server(), text: { body: t('notif.body'), yes: t('yes'), no: t('no') } });
  caches.open('lensy-state').then(c => c.put(STATE_URL, new Response(body, { headers: { 'Content-Type': 'application/json' } }))).catch(() => {});
}
async function absorbPending() { // "Yes" taps made on a notification while the app was closed
  if (!canSW || !window.caches) return;
  try {
    const c = await caches.open('lensy-state'), r = await c.match(PENDING_URL);
    if (!r) return;
    const list = await r.json(); await c.delete(PENDING_URL);
    let changed = false;
    (Array.isArray(list) ? list : []).forEach(d => { if (isDate(d) && d <= today() && !S.log[d]) { S.log[d] = true; queueOp(d, true); changed = true; } });
    if (changed) { persist(); softRender(); }
  } catch (e) {}
}
function b64uBytes(s) {
  const b = atob(s.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((s.length + 3) % 4));
  return Uint8Array.from(b, ch => ch.charCodeAt(0));
}
async function enablePush() { // registers this device with the account for server-sent reminders
  if (!server()) return false;
  const reg = await getReg();
  if (!reg || !reg.pushManager) return false;
  const opts = { userVisibleOnly: true, applicationServerKey: b64uBytes(CFG.vapidPublicKey) };
  let sub = await reg.pushManager.getSubscription();
  if (!sub) {
    try { sub = await reg.pushManager.subscribe(opts); }
    catch (e) { const old = await reg.pushManager.getSubscription(); if (old) await old.unsubscribe(); sub = await reg.pushManager.subscribe(opts); }
  }
  const j = sub.toJSON();
  const { error } = await sb.from('push_subscriptions').upsert({ endpoint: j.endpoint, user_id: user.id, p256dh: j.keys.p256dh, auth: j.keys.auth }, { onConflict: 'endpoint' });
  if (error) throw error;
  return true;
}
async function dropPush() {
  try {
    const reg = await getReg(), sub = reg && reg.pushManager && await reg.pushManager.getSubscription();
    if (!sub) return;
    if (sb && user) await sb.from('push_subscriptions').delete().eq('endpoint', sub.endpoint);
    await sub.unsubscribe();
  } catch (e) {}
}
async function notify() {
  try {
    const reg = await getReg();
    if (!reg || !('Notification' in window) || Notification.permission !== 'granted') return false;
    await reg.showNotification('LENSY', { body: t('notif.body'), tag: 'lensy-daily', renotify: true, icon: 'icon-192.png', badge: 'icon-192.png', data: { date: today() }, actions: [{ action: 'yes', title: t('yes') }, { action: 'no', title: t('no') }] });
    return true;
  } catch (e) { return false; }
}
function reminderTick() { // fallback while not signed in: only works while the app is still in memory
  if (!S.notif.on || server() || document.visibilityState === 'visible') return;
  const td = today(), now = new Date(), tm = S.notif.time.split(':').map(Number);
  if (S.log[td] || now.getHours() * 60 + now.getMinutes() < tm[0] * 60 + tm[1]) return;
  try { if (localStorage.getItem(KEY + '_asked') === td) return; } catch (e) {}
  notify().then(ok => { if (ok) try { localStorage.setItem(KEY + '_asked', td); } catch (e) {} });
}
async function setReminder(on) {
  ui.msg = ''; ui.sent = false;
  if (!on) { S.notif.on = false; touch(); render(); return; }
  if (!('Notification' in window) || !canSW) { ui.msg = /iPhone|iPad|iPod/.test(navigator.userAgent) ? 'rem.ios' : 'rem.unsupported'; render(); return; }
  let p = Notification.permission;
  if (p === 'default') { try { p = await Notification.requestPermission(); } catch (e) { p = 'denied'; } }
  if (p !== 'granted') { ui.msg = 'rem.blocked'; render(); return; }
  S.notif.on = true;
  if (server()) { try { await enablePush(); } catch (e) { ui.msg = 'rem.fail'; } }
  else { const reg = await getReg(); if (reg && reg.periodicSync) reg.periodicSync.register('lensy-reminder', { minInterval: 6 * 3600 * 1000 }).catch(() => {}); }
  touch(); render();
}

/* ---------- events ---------- */
function setDay(d) {
  if (d > today()) return;
  const on = !S.log[d];
  if (on) S.log[d] = true; else delete S.log[d];
  if (navigator.vibrate) try { navigator.vibrate(8); } catch (e) {}
  let counted = false; // daily lenses: each worn day uses one from the stock
  sides().forEach(s => { const e = S.eyes[s]; if (e.type === 'daily' && e.stock != null) { e.stock = Math.max(0, Math.min(999, e.stock + (on ? -1 : 1))); counted = true; } });
  if (counted) touch(); else persist();
  queueOp(d, on); render();
}
document.addEventListener('click', ev => {
  const el = ev.target.closest('[data-act]'); if (!el) return;
  const act = el.dataset.act, val = el.dataset.val;
  switch (act) {
    case 'modal-close': if (ev.target === el && !locked()) closeModal(); return;
    case 'consent-yes': agreeConsent(); return;
    case 'consent-no': declineConsent(); return;
    case 'stock': {
      const e = S.eyes[S.dual ? ui.side : 'left'], step = +val > 0 ? 1 : -1;
      e.stock = e.stock == null ? (step > 0 ? 1 : null) : (e.stock + step < 0 ? null : Math.min(999, e.stock + step));
      touch(); render(); return;
    }
    case 'modal-ok': { const fn = ui.modal && ui.modal.fn; closeModal(); if (fn) fn(); return; }
    case 'tab': if (ui.tab !== el.dataset.tab) { ui.tab = el.dataset.tab; ui.msg = ''; ui.sent = false; render(); window.scrollTo(0, 0); } return;
    case 'day': setDay(el.dataset.date); return;
    case 'start': S.onboarded = true; touch(); render(); window.scrollTo(0, 0); return;
    case 'newpair': {
      const side = el.dataset.side;
      openModal({ kind: 'confirm', title: S.dual ? t('newlens.' + side) + '?' : t('new.title'), text: t('new.text'), ok: S.dual ? t('newlens.' + side) : t('new.ok'), fn: () => {
        S.eyes[side].start = today(); if (!S.dual) S.eyes.right.start = today();
        if (S.eyes[side].stock > 0) S.eyes[side].stock--; // one spare is now in use
        touch(); render();
      } });
      return;
    }
    case 'month': { let m = ui.month.m + +val, y = ui.month.y; if (m < 0) { m = 11; y--; } if (m > 11) { m = 0; y++; } ui.month = { y, m }; render(); return; }
    case 'side': ui.side = val; render(); return;
    case 'type': {
      const s = S.dual ? ui.side : 'left';
      if (TYPES[val] && S.eyes[s].type !== val) { S.eyes[s].type = val; S.eyes[s].start = today(); if (!S.dual) { S.eyes.right.type = val; S.eyes.right.start = today(); } }
      if (S.onboarded) touch(); else persist();
      render(); return;
    }
    case 'dual': S.dual = !S.dual; ui.side = 'left'; touch(); render(); return;
    case 'count': S.count = val === 'calendar' ? 'calendar' : 'worn'; touch(); render(); return;
    case 'theme': S.theme = val; applySettings(settingsBlob()); applyTheme(); touch(); render(); return;
    case 'lang': S.lang = val; applySettings(settingsBlob()); touch(); render(); return;
    case 'notif': setReminder(!S.notif.on); return;
    case 'test': notify().then(ok => { ui.sent = ok; ui.msg = ok ? '' : 'rem.testfail'; render(); }); return;
    case 'ics': shareOrDownload(new File([buildICS()], 'lensy.ics', { type: 'text/calendar' })); return;
    case 'export': exportData(); return;
    case 'auth': if (sb) openModal({ kind: 'auth', mode: 'in' }); return;
    case 'auth-mode': { const e = document.getElementById('a-email'); openModal({ kind: 'auth', mode: val, email: e ? e.value : '' }); return; }
    case 'oauth': if (sb && (val === 'google' || val === 'apple')) sb.auth.signInWithOAuth({ provider: val, options: { redirectTo: SITE } }).catch(() => authMsg('a.err', true)); return;
    case 'signout': openModal({ kind: 'confirm', title: t('out.title'), text: t('out.text'), ok: t('set.signout'), fn: signOut }); return;
    case 'delete': openModal({ kind: 'confirm', title: t('del.title'), text: t('del.text'), ok: t('del.ok'), destructive: true, fn: deleteAccount }); return;
    case 'clear': openModal({ kind: 'confirm', title: t('erase.title'), text: t('erase.text'), ok: t('erase.ok'), destructive: true, fn: wipeLocal }); return;
  }
});
document.addEventListener('submit', ev => {
  ev.preventDefault();
  if (ev.target.id === 'auth-form' && sb) authSubmit();
  if (ev.target.id === 'pass-form' && sb) passSubmit();
});
document.addEventListener('input', ev => {
  const el = ev.target, f = el.dataset.field;
  if (f && f !== 'start') { S.eyes[S.dual ? ui.side : 'left'][f] = el.value.slice(0, 120); touch(); }
});
document.addEventListener('change', ev => {
  const el = ev.target;
  if (el.dataset.field === 'start') {
    if (isDate(el.value) && el.value <= today()) {
      S.eyes[S.dual ? ui.side : 'left'].start = el.value; if (!S.dual) S.eyes.right.start = el.value;
      if (S.onboarded) touch(); else persist();
    }
    render();
  }
  if (el.dataset.setting === 'time' && /^([01]\d|2[0-3]):[0-5]\d$/.test(el.value)) {
    S.notif.time = el.value; try { localStorage.removeItem(KEY + '_asked'); } catch (e) {}
    touch();
  }
});
document.addEventListener('keydown', ev => { if (ev.key === 'Escape' && ui.modal && !locked()) closeModal(); });

let shownDay = today();
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    absorbPending(); sync();
    if (shownDay !== today()) { shownDay = today(); softRender(); }
  } else reminderTick();
});
window.addEventListener('online', () => sync());
setInterval(() => {
  reminderTick();
  if (shownDay !== today() && document.visibilityState === 'visible') { shownDay = today(); softRender(); }
}, 60000);
if (canSW) navigator.serviceWorker.addEventListener('message', e => {
  if (e.data && e.data.type === 'lensy-pending') { absorbPending(); sync(); }
});

/* ---------- start ---------- */
try {
  applyTheme(); render(); mirror(); absorbPending();
  if (sb && /error_description=/.test(location.hash + location.search)) { // a sign-in link came back with an error
    history.replaceState(null, '', SITE);
    openModal({ kind: 'auth', mode: 'in' }); authMsg('a.err', true);
  }
} catch (err) {
  app.textContent = 'LENSY could not start: ' + (err && err.message);
}
})();
