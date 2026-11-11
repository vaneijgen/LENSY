/* Privacy notice for LENSY, in Dutch and English. Operator details come from config.js.
   This text is a careful starting point, not legal advice: have it reviewed before you offer LENSY to others. */
(() => {
'use strict';
const CFG = self.LENSY_CONFIG || {};
const OP = CFG.operator || {};
const VERSION = { nl: 'Versie 1, 11 november 2026', en: 'Version 1, 11 November 2026' };

let stored = {};
try { stored = JSON.parse(localStorage.getItem('lensy_v1')) || {}; } catch (e) {}
let lang = stored.lang === 'en' || stored.lang === 'nl' ? stored.lang : (/^nl/i.test(navigator.language || '') ? 'nl' : 'en');
if (stored.theme === 'light' || stored.theme === 'dark') document.documentElement.setAttribute('data-theme', stored.theme);

// "@op" in a paragraph is replaced by the operator's details.
const DOC = {
  nl: {
    title: 'Privacy', back: 'Terug naar LENSY', other: 'English', missing: 'in te vullen in config.js',
    opLabels: { name: 'Naam', address: 'Adres', email: 'E-mail', number: 'Ondernemingsnummer' },
    sections: [
      ['Wie is verantwoordelijk', ['De verantwoordelijke voor de verwerking van je gegevens is:', '@op', 'Met elke vraag over je gegevens kan je op dat e-mailadres terecht.']],
      ['Welke gegevens LENSY gebruikt', [
        'Zonder account blijft alles op je eigen toestel. Wij ontvangen dan niets.',
        'Met een account bewaren we:',
        ['je e-mailadres, en als je met Google inlogt ook je Google-account-ID', 'de dagen waarop je lenzen droeg', 'je lensgegevens: type, openingsdatum, voorraad en wat je zelf invult (merk, sterkte, basiscurve, diameter, notities)', 'je instellingen: taal, tijdzone en het tijdstip van je herinnering', 'per toestel een technisch adres om een melding te kunnen sturen, als je herinneringen aanzet', 'het tijdstip waarop je toestemming gaf'],
        'LENSY gebruikt geen analyse- of advertentietrackers en vraagt je locatie niet op.'
      ]],
      ['Waarom, en op welke grond', [
        ['Je account en het gelijk houden van je gegevens op al je toestellen: om de dienst te leveren die je vraagt (artikel 6.1.b AVG).', 'Je draagdagen en lensgegevens zijn gegevens over gezondheid. Die bewaren we alleen met je uitdrukkelijke toestemming (artikel 9.2.a AVG), die je geeft wanneer je voor het eerst inlogt.', 'Herinneringen: alleen als je ze zelf aanzet en je browser meldingen toestaat.'],
        'We gebruiken je gegevens niet voor profilering of geautomatiseerde beslissingen en verkopen ze niet.'
      ]],
      ['Wie je gegevens ontvangt', [
        ['Supabase verzorgt als verwerker de database en het inloggen. De gegevens staan op servers in de Europese Unie. Supabase is een Amerikaans bedrijf; voor eventuele toegang van buiten de EU gelden de standaardcontractbepalingen uit de verwerkersovereenkomst.', 'De meldingsdienst van je browser (Google, Apple, Mozilla of Microsoft) bezorgt de herinnering. De inhoud is versleuteld en voor die dienst niet leesbaar.', 'Google, alleen als je ervoor kiest om met Google in te loggen.', 'Een webwinkel, alleen als je zelf op "Opnieuw bestellen" tikt. Dan staat je lensmerk in de link. Vanaf dat moment geldt het privacybeleid van die winkel.']
      ]],
      ['Opslag op je toestel', ['LENSY bewaart je gegevens en je login in de opslag van je browser. Dat is nodig om de app te laten werken. Er worden geen cookies of andere technieken gebruikt om je te volgen, en daarom is er geen cookiemelding.']],
      ['Hoe lang', ['We bewaren je gegevens tot je je account verwijdert. Ze worden dan meteen uit de database gewist; reservekopieën bij de hostingpartij vervallen volgens hun vaste termijnen. Gebruik je LENSY zonder account, dan blijven de gegevens op je toestel tot je ze wist.']],
      ['Je rechten', [
        ['Inzien en meenemen: Instellingen > Mijn gegevens downloaden.', 'Verbeteren: je past alles zelf aan in de app.', 'Wissen en toestemming intrekken: Instellingen > Account verwijderen. Intrekken heeft geen gevolgen voor wat daarvoor rechtmatig gebeurde.', 'Bezwaar maken of de verwerking laten beperken: via het e-mailadres hierboven.'],
        'Je kan ook een klacht indienen bij de Gegevensbeschermingsautoriteit, Drukpersstraat 35, 1000 Brussel, www.gegevensbeschermingsautoriteit.be.'
      ]],
      ['Leeftijd', ['Een account is bedoeld voor wie 13 jaar of ouder is.']],
      ['Geen medisch hulpmiddel', ['LENSY is een hulpmiddel om draagdagen bij te houden. Het is geen medisch hulpmiddel en geeft geen medisch advies. Volg altijd de aanwijzingen van je opticien of oogarts en van de fabrikant van je lenzen.']],
      ['Reclame', ['De link "Opnieuw bestellen" is reclame. Als je via die link iets koopt, kan de beheerder van LENSY een commissie krijgen. Dat verandert niets aan de prijs die je betaalt. LENSY raadt geen andere lenzen aan dan degene die je zelf invulde.']],
      ['Beveiliging', ['Elke gebruiker heeft alleen toegang tot zijn eigen gegevens, de verbinding is versleuteld en wachtwoorden worden niet door de app zelf bewaard. Bij een inbreuk die een risico voor je inhoudt, brengen we je op de hoogte.']],
      ['Wijzigingen', ['De laatste versie van deze verklaring staat altijd op deze pagina.']]
    ]
  },
  en: {
    title: 'Privacy', back: 'Back to LENSY', other: 'Nederlands', missing: 'to be filled in in config.js',
    opLabels: { name: 'Name', address: 'Address', email: 'Email', number: 'Enterprise number' },
    sections: [
      ['Who is responsible', ['The controller of your personal data is:', '@op', 'You can use that email address for any question about your data.']],
      ['What data LENSY uses', [
        'Without an account everything stays on your own device. We then receive nothing.',
        'With an account we store:',
        ['your email address, and your Google account ID if you sign in with Google', 'the days on which you wore lenses', 'your lens details: type, opening date, stock and what you enter yourself (brand, power, base curve, diameter, notes)', 'your settings: language, time zone and the time of your reminder', 'per device, a technical address needed to send a notification, if you turn reminders on', 'the time at which you gave consent'],
        'LENSY uses no analytics or advertising trackers and does not ask for your location.'
      ]],
      ['Why, and on what legal basis', [
        ['Your account and keeping your data the same on all your devices: to provide the service you ask for (Article 6(1)(b) GDPR).', 'Your wear days and lens details are data concerning health. We only store them with your explicit consent (Article 9(2)(a) GDPR), which you give when you first sign in.', 'Reminders: only if you turn them on yourself and your browser allows notifications.'],
        'We do not use your data for profiling or automated decisions and we do not sell it.'
      ]],
      ['Who receives your data', [
        ['Supabase provides the database and sign-in as our processor. The data is kept on servers in the European Union. Supabase is a US company; any access from outside the EU is covered by the standard contractual clauses in the data processing agreement.', 'Your browser’s notification service (Google, Apple, Mozilla or Microsoft) delivers the reminder. Its content is encrypted and cannot be read by that service.', 'Google, only if you choose to sign in with Google.', 'A web shop, only if you tap "Order again" yourself. Your lens brand is then part of the link. From that moment the shop’s own privacy policy applies.']
      ]],
      ['Storage on your device', ['LENSY keeps your data and your sign-in in your browser’s storage. This is needed for the app to work. No cookies or other techniques are used to track you, which is why there is no cookie notice.']],
      ['How long', ['We keep your data until you delete your account. It is then removed from the database at once; backups at the hosting provider expire on their fixed schedule. If you use LENSY without an account, the data stays on your device until you erase it.']],
      ['Your rights', [
        ['Access and portability: Settings > Download my data.', 'Rectification: you can change everything yourself in the app.', 'Erasure and withdrawing consent: Settings > Delete account. Withdrawal does not affect what was lawfully done before.', 'Objecting or restricting processing: through the email address above.'],
        'You can also lodge a complaint with the Belgian Data Protection Authority, Rue de la Presse 35, 1000 Brussels, www.dataprotectionauthority.be.'
      ]],
      ['Age', ['An account is meant for people aged 13 or older.']],
      ['Not a medical device', ['LENSY is a tool for keeping track of wear days. It is not a medical device and gives no medical advice. Always follow the instructions of your optician or eye doctor and of the maker of your lenses.']],
      ['Advertising', ['The "Order again" link is advertising. If you buy something through it, the operator of LENSY may earn a commission. This does not change the price you pay. LENSY does not recommend any lenses other than the ones you entered yourself.']],
      ['Security', ['Each user can only reach their own data, the connection is encrypted and passwords are not stored by the app itself. If a breach puts you at risk, we will let you know.']],
      ['Changes', ['The latest version of this notice is always on this page.']]
    ]
  }
};

const el = (tag, text, cls) => { const n = document.createElement(tag); if (text != null) n.textContent = text; if (cls) n.className = cls; return n; };

function operatorBlock(d) {
  const ul = el('ul');
  ['name', 'address', 'email', 'number'].forEach(k => {
    const v = typeof OP[k] === 'string' ? OP[k].trim() : '';
    if (!v && k === 'number') return; // optional
    const li = el('li', d.opLabels[k] + ': ');
    li.appendChild(v ? document.createTextNode(v) : el('span', '[' + d.missing + ']', 'todo'));
    ul.appendChild(li);
  });
  return ul;
}

function render() {
  const d = DOC[lang], root = document.getElementById('app');
  document.documentElement.lang = lang;
  root.textContent = '';
  const back = el('a', '‹ ' + d.back, 'back'); back.href = './'; root.appendChild(back);
  const head = el('header', null, 'head'); head.appendChild(el('h1', d.title)); root.appendChild(head);
  root.appendChild(el('p', VERSION[lang], 'meta'));
  d.sections.forEach(sec => {
    root.appendChild(el('h2', sec[0]));
    sec[1].forEach(part => {
      if (part === '@op') root.appendChild(operatorBlock(d));
      else if (Array.isArray(part)) { const ul = el('ul'); part.forEach(x => ul.appendChild(el('li', x))); root.appendChild(ul); }
      else root.appendChild(el('p', part));
    });
  });
  const sw = el('button', d.other, 'link');
  sw.addEventListener('click', () => { lang = lang === 'nl' ? 'en' : 'nl'; render(); window.scrollTo(0, 0); });
  root.appendChild(sw);
}
render();
})();
