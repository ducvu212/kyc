import i18next from 'i18next';
import ja from "./ja";
import en from "./en";

i18next.init({
  interpolation: {
    escapeValue: false,
  },
  lng: 'en',
  resources: {
    en: {
      translation: en
    },
    ja: {
      translation: ja
    }
  },
})

export default i18next
