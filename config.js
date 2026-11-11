/* LENSY settings. Fill these in after following setup/SETUP.md.
   Everything in this file is public by design; never put a secret key in it.
   Leave the Supabase values empty to run LENSY without accounts (data stays on the device). */
self.LENSY_CONFIG = {
  supabaseUrl: "https://oobpoqddtxnfgxegocgf.supabase.co",     // e.g. "https://abcdefghijkl.supabase.co"
  supabaseKey: "sb_publishable_l83B955lEL24fcDEM4Y4iA_lDfZaCZp",     // the publishable key, starts with "sb_publishable_"
  vapidPublicKey: "BAzjfqgNj8Jq649gzag_hKNkuVswuwGFfb9IfZVL6R4yp8hqkA2NugLoLMvTf9pwGoV2hfW3c_ysdKEuYFnSC0s",  // from setup/keys.html
  apple: false,         // set to true once Sign in with Apple is configured in Supabase

  // "Order again" link. Leave empty for no link. Must start with https:// and contain {brand},
  // which is replaced by the lens brand the user entered. Put your affiliate address here.
  // Example: "https://www.example-shop.be/search?q={brand}&partner=YOUR-ID"
  shopUrl: "",

  // Who runs this app. Shown in the privacy notice and required by law once others use it.
  operator: {
    name: "Berty",          // your name or company name
    address: "Belgium",       // street, postcode, city, country
    email: "berty.vaneijgen@gmail.com",         // contact address for privacy questions
    number: ""          // enterprise (KBO/VAT) number, if you have one
  }
};
