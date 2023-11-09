'use client';
import { Logo, HeaderItem } from './styles';
import { Locale } from 'locales/i18n.config';
import { getDictionary } from 'lib/dictionary';
import LocaleSwitcher from 'components/locale-switcher';

type Props = {
  lang: Locale;
};

export default async function Header({ lang }: Props) {
  const { Home } = await getDictionary(lang);
  return (
    <HeaderItem>
      <Logo href="/">{Home.TestHeader.title}</Logo>
      <LocaleSwitcher />
    </HeaderItem>
  );
}
