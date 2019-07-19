import i18n from "i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from "react-i18next";
import resources from '../locales.json';

export default i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: resources,
        keySeparator: false,
        fallbackLng: 'en-US',
        interpolation: {
            escapeValue: false
        },
        order: ['localStorage'],
        detection: {
            lookupLocalStorage: 'uni-lang'
        }
    });
