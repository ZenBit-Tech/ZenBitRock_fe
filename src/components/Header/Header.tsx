'use client';

import { useTranslations } from 'next-intl';
import { pageLinks } from 'constants/pageLinks';
import { Logo, HeaderItem } from './styles';

export default function Header(): JSX.Element {
  const t = useTranslations('Home');
  return (
    <HeaderItem>
      <Logo href={pageLinks.HOME_PAGE}>{t('Header.title')}</Logo>
    </HeaderItem>
  );
}
