'use client';

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { Locale } from 'locales/i18n.config';
import { getDictionary } from 'lib/dictionary';
import LocaleSwitcher from 'components/locale-switcher';
import { pageLinks } from 'constants/pageLinks';
import { Logo, HeaderItem } from './styles';

type Props = {
  lang: Locale;
};

type HeaderType = {
  Header: {
    [key: string]: string;
  };
  Page: {
    [key: string]: string;
  };
};

export default function Header({ lang }: Props) {
  const [data, setData] = useState<HeaderType | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { Home } = await getDictionary(lang);
        setData(Home);
      } catch (error) {
        notFound();
      }
    };

    fetchData();
  }, [lang]);

  return (
    <HeaderItem>
      <Logo href={pageLinks.HOME_PAGE}>{data?.Header.title}</Logo>
      <LocaleSwitcher />
    </HeaderItem>
  );
}
