'use client';

import { notFound } from 'next/navigation';
import { Locale } from 'locales/i18n.config';
import { getDictionary } from 'lib/dictionary';
import LocaleSwitcher from 'components/locale-switcher';
import { Logo, HeaderItem } from './styles';
import { pageLinks } from 'constants/pageLinks';

type Props = {
  lang: Locale;
};

export default async function Header({ lang }: Props) {
  try {
    const { Home } = await getDictionary(lang);
    return (
      <HeaderItem>
        <Logo href={pageLinks.HOME_PAGE}>{Home.Header.title}</Logo>
        <LocaleSwitcher />
      </HeaderItem>
    );
  } catch (error) {
    notFound();
  }
}
