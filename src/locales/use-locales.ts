'use client';

import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { useSettingsContext } from 'components/settings';
import { localStorageGetItem } from 'utils/storage-available';

import { allLangs, defaultLang } from './config-lang';

export default function useLocales() {
  const { i18n, t } = useTranslation();

  const settings = useSettingsContext();

  const langStorage = localStorageGetItem('i18nextLng');

  const currentLang = allLangs.find((lang) => lang.value === langStorage) || defaultLang;

  const onChangeLang = useCallback(
    (newlang: string) => {
      i18n.changeLanguage(newlang);
      settings.onChangeDirectionByLang(newlang);
    },
    [i18n, settings]
  );

  return {
    allLangs,
    t,
    currentLang,
    onChangeLang,
  };
}
