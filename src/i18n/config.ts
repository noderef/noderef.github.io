import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from '../locales/en.json';
import nlTranslations from '../locales/nl.json';
import deTranslations from '../locales/de.json';
import frTranslations from '../locales/fr.json';

const LANGUAGE_STORAGE_KEY = 'noderef-language';

// Get preferred language: check localStorage first, then browser, default to 'en'
const getPreferredLanguage = (): string => {
  const supportedLanguages = ['en', 'nl', 'de', 'fr'];

  // Check if user has previously selected a language
  const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (savedLanguage && supportedLanguages.includes(savedLanguage)) {
    return savedLanguage;
  }

  // Fall back to browser language
  const browserLang = navigator.language.split('-')[0]; // Get language code (e.g., 'en' from 'en-US')
  return supportedLanguages.includes(browserLang) ? browserLang : 'en';
};

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslations,
    },
    nl: {
      translation: nlTranslations,
    },
    de: {
      translation: deTranslations,
    },
    fr: {
      translation: frTranslations,
    },
  },
  lng: getPreferredLanguage(),
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // React already escapes values
  },
});

export default i18n;
