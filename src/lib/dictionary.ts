import type { Locale } from 'locales/i18n.config';

const dictionaries = {
  en: () => import('locales/langs/en.json').then((module) => module.default),
  de: () => import('locales/langs/de.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();
