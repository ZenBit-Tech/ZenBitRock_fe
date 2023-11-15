'use client';

import { notFound } from 'next/navigation';
import { Locale } from 'locales/i18n.config';
import { getDictionary } from 'lib/dictionary';
import LocaleSwitcher from 'components/locale-switcher';
import { Logo, HeaderItem } from './styles';

type Props = {
  lang: Locale;
};

export default async function Header({ lang }: Props) {
  try {
    const { Home } = await getDictionary(lang);
    return (
      <HeaderItem>
        <Logo href="/">{Home.Header.title}</Logo>
        <LocaleSwitcher />
      </HeaderItem>
    );
  } catch (error) {
    notFound();
  }
}
