# LENSY

Keep track of the days you wear your contact lenses and see at a glance when your pair is due for replacement.

**Open the app:** https://vaneijgen.github.io/LENSY/

LENSY is a web app that you add to your home screen, after which it behaves like a regular app on iPhone and Android. The interface is available in English and Dutch.

## What it does

- **Countdown per pair.** A ring shows how much of your current pair is left, with the date it lasts until. For daily, weekly, two-week and monthly lenses.
- **One tap a day.** Log today with a single button, or fill in earlier days in the calendar.
- **Calendar.** A monthly overview of your wear days, with the last day of your current pair marked.
- **Each eye separately.** Optional, for people whose left and right lens follow a different schedule.
- **Stock.** Track how many spare pairs you have at home; the app tells you when you are running low.
- **Reminder.** A daily notification asking whether you wore your lenses. On Android you answer Yes or No right from the notification.
- **Calendar export.** Send your wear days and the replacement date to Apple Calendar, Google Calendar or Outlook.
- **Account (optional).** Sign in with email or Google to keep your data the same on all your devices. Without an account everything still works and stays on your device.

## Install on your phone

**iPhone:** open the link in Safari, tap Share and choose *Add to Home Screen*.

**Android:** open the link in Chrome, tap the three dots and choose *Add to Home screen* or *Install app*.

On iPhone, notifications only work once the app is on the home screen, and without the Yes/No buttons.

## Privacy

- Without an account, nothing leaves your device.
- With an account, your data is only stored after you explicitly agree, on servers in the EU.
- No advertising or analytics trackers.
- You can download your data and delete your account, with everything in it, from Settings.

The full text is in the [privacy notice](https://vaneijgen.github.io/LENSY/privacy.html).

## Not a medical device

LENSY counts days and gives no medical advice. Always follow the instructions of your optician or eye doctor and of the maker of your lenses.

## How it is built

- A single static site: HTML, CSS and JavaScript with no framework or build step, hosted on GitHub Pages.
- Works offline through a service worker.
- Accounts, storage and push notifications run on [Supabase](https://supabase.com) (a database with row level security and an edge function).
- A Content Security Policy allows only the site's own files and Supabase; no external scripts are loaded.

| File | Role |
|---|---|
| `index.html`, `styles.css`, `app.js` | the app |
| `config.js` | settings: Supabase address, public keys, operator details |
| `sw.js` | offline support and notifications |
| `privacy.html`, `privacy.js` | privacy notice |
| `supabase.js` | Supabase client library (MIT license) |
| `manifest.json`, `icon-*.png`, `apple-touch-icon.png` | home screen installation |

`config.js` holds public values only. Secret keys live in Supabase and never belong in this repository.

## License

Copyright © 2026 Berty Van Eijgen. All rights reserved.

The code in this repository is public so that it can be inspected. It may not be copied, modified or redistributed without written permission. `supabase.js` belongs to Supabase and is covered by the MIT license.
