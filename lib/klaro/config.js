// By default, Klaro will load the config from  a global "klaroConfig" variable.
// You can change this by specifying the "data-config" attribute on your
// script take, e.g. like this:
// <script src="klaro.js" data-config="myConfigVariableName" />
// You can also disable auto-loading of the consent notice by adding
// data-no-auto-load=true to the script tag.
var klaroConfig = {
    // You can customize the ID of the DIV element that Klaro will create
    // when starting up. If undefined, Klaro will use 'klaro'.
  elementID: 'klaro',

    // You can customize the name of the cookie that Klaro uses for storing
    // user consent decisions. If undefined, Klaro will use 'klaro'.
  cookieName: 'klaro',

    // You can also set a custom expiration time for the Klaro cookie.
    // By default, it will expire after 120 days.
  cookieExpiresAfterDays: 365,

    // You can customize the name of the cookie that Klaro will use to
    // store user consent. If undefined, Klaro will use 'klaro'.

    // Put a link to your privacy policy here (relative or absolute).
  privacyPolicy: '/pp.html',

    // Defines the default state for applications (true=enabled by default).
  default: true,

    // If "mustConsent" is set to true, Klaro will directly display the consent
    // manager modal and not allow the user to close it before having actively
    // consented or declines the use of third-party apps.
  mustConsent: false,

    // You can define the UI language directly here. If undefined, Klaro will
    // use the value given in the global "lang" variable. If that does
    // not exist, it will use the value given in the "lang" attribute of your
    // HTML tag. If that also doesn't exist, it will use 'en'.
  lang: 'sv',

    // You can overwrite existing translations and add translations for your
    // app descriptions and purposes. See `src/translations.yml` for a full
    // list of translations that can be overwritten:
    // https://github.com/DPKit/klaro/blob/master/src/translations.yml

    // Example config that shows how to overwrite translations:
    // https://github.com/DPKit/klaro/blob/master/src/configs/i18n.js
  translations: {
        // If you erase the "consentModal" translations, Klaro will use the
        // defaults as defined in translations.yml
    sv: {
      consentModal: {
        title: 'Information som vi samlar',
        description: 'Här kan du se och anpassa vilken information vi samlar om dig.',
        privacyPolicy: {
          name: 'Integritetspolicy',
          text: 'För att veta mer, läs vår {privacyPolicy}.'
        }
      },
      consentNotice: {
        changeDescription: 'Det har skett förändringar sedan ditt senaste besök, var god uppdatera ditt medgivande.',
        description: 'Vi samlar och bearbetar din personliga data i följande syften: {purposes}.',
        learnMore: 'Läs mer'
      },
      learnMore: 'Läs mer',
      ok: 'OK',
      save: 'Spara',
      decline: 'Avböj',
      app: {
        disableAll: {
          title: 'Ändra för alla tjänster',
          description: 'Använd detta reglage för att aktivera/avaktivera samtliga appar.'
        },
        optOut: {
          title: '(Avaktivera)',
          description: 'Den här appen laddas som standardinställning (men du kan avaktivera den)'
        },
        required: {
          title: '(Krävs alltid)',
          description: 'Den här applikationen krävs alltid'
        }
      },
      poweredBy: 'Körs på Klaro!',
      purpose: 'Syfte',
      googleAnalytics: {
        description: 'Analysmjukvara som hjälper oss att förbättra vår hemsida baserat på anonym information om besökare.'
      },
      chat: {
        description: 'Chat-modul som kan samla in dina kontaktuppgifter om du vill bli kontaktad widget & collecting of visitor statistics (just an example)'
      },
      purposes: {
        analytics: 'Besökaranalys',
        livechat: 'Kontaktmöjligheter'
      }
    }
  },

    // This is a list of third-party apps that Klaro will manage for you.
  apps: [
    {
            // Each app should have a unique (and short) name.
      name: 'googleAnalytics',

            // If "default" is set to true, the app will be enabled by default
            // Overwrites global "default" setting.
            // We recommend leaving this to "false" for apps that collect
            // personal information.
      default: true,

            // The title of you app as listed in the consent modal.
      title: 'Google Analytics',

            // The purpose(s) of this app. Will be listed on the consent notice.
            // Do not forget to add translations for all purposes you list here.
      purposes: ['analytics'],
            // If "onlyOnce" is set to true, the app will only be executed
            // once regardless how often the user toggles it on and off.
      onlyOnce: true
    },

        // The apps will appear in the modal in the same order as defined here.
    {
      name: 'chat',
      title: 'Chat-modul',
      purposes: ['livechat'],
      optOut: false,
      default: true
    }
  ]
}
