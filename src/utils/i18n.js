import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
    en: {
        translation: {
            "account.type.label": "Account type",
            "account.email.label": "Email",
            "account.password.label": "Password",
            "account.name.label": "Name",
            "account.login.label": "Login",
            "account.register.label": "Register",
            "account.logout.label": "Logout",
            "company.label": "Company",
            "company.name.label": "Company name",
            "global.search.label": "Search",
            "global.profile.label": "Profile",
            "global.home.label": "Home",
            "student.label": "Student",
            "student.name.label": "Student name",
            "university.label": "University",
            "university.name.label": "University name"
        }
    },
    bg: {
        translation: {
            "account.type.label": "Тип акаунт",
            "account.email.label": "Имейл",
            "account.password.label": "Парола",
            "account.name.label": "Име",
            "account.login.label": "Вход",
            "account.register.label": "Регисртация",
            "account.logout.label": "Изход",
            "company.label": "Компания",
            "company.name.label": "Име на компания",
            "global.search.label": "Търсене",
            "global.profile.label": "Профил",
            "global.home.label": "Начало",
            "student.label": "Студент",
            "student.name.label": "Име на студент",
            "university.label": "Университет",
            "university.name.label": "Име на университет"
        }
    }
};

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
