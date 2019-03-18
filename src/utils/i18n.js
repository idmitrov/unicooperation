import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import resources from '../locales.json';

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'en',
        keySeparator: false,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
