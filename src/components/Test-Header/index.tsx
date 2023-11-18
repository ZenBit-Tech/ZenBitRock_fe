'use client';

import { useTranslations } from 'next-intl';
import LocaleSwitcher from 'components/locale-switcher';
import { Logo, TestHeaderItem } from './styles';

export default function TestHeader(): JSX.Element {
  const t = useTranslations('Home');

  return (
    <TestHeaderItem>
      <Logo href="/">{t('Header.title')}</Logo>
      <LocaleSwitcher />
    </TestHeaderItem>
  );
}
