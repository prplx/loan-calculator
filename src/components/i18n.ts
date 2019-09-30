import i18n from 'i18next';
import XHR from 'i18next-xhr-backend';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import tLoanCalcRu from '../locales/ru/loanCalc.json';
import tLoanCalcEn from '../locales/en/loanCalc.json';

const resources = {
  ru: {
    loanCalc: tLoanCalcRu,
  },
  en: {
    loanCalc: tLoanCalcEn,
  },
};

i18n
  .use(XHR)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ru',
    ns: ['loanCalc'],
    defaultNS: 'loanCalc',
    react: {
      wait: true,
      useSuspense: false,
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    detection: {
      order: ['path'],
    },
  });

export default i18n;
