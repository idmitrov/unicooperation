import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
    en: {
        translation: {
            "account.type.label": "Account type",
            "account.email.label": "Email",
            "account.password.label": "Password",
            "account.name.label": "Name",
            "company.label": "Company",
            "company.name.label": "Company name",
            "student.label": "Student",
            "student.name.label": "Student name",
            "welcome.login.label": "Login",
            "welcome.register.label": "Register",
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
            "student.label": "Студент",
            "student.name.label": "Име на студент",
            "company.label": "Компания",
            "company.name.label": "Име на компания",
            "welcome.login.label": "Вход",
            "welcome.register.label": "Регисртация",
            "university.label": "Университет",
            "university.name.label": "Име на университет"
        }
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "en",
        keySeparator: false,
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
