import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './locales/en/translation';
import thTranslation from './locales/th/translation';

const STORAGE_KEY = 'app_lang';

const detectInitialLanguage = () => {
  const storedLanguage = window.localStorage.getItem(STORAGE_KEY);
  if (storedLanguage === 'th' || storedLanguage === 'en') {
    return storedLanguage;
  }

  return 'en';
};

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslation },
    th: { translation: thTranslation },
  },
  lng: detectInitialLanguage(),
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

i18n.on('languageChanged', (language) => {
  window.localStorage.setItem(STORAGE_KEY, language);
  document.documentElement.lang = language;
});

document.documentElement.lang = i18n.language;

export default i18n;
