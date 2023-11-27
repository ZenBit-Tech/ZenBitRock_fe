'use client';

import { useTranslations } from 'next-intl';
import { links } from 'constants/links';
import { Logo, HeaderItem } from './styles';

export default function Header(): JSX.Element {
  const t = useTranslations('Home');
  return (
    <HeaderItem>
      <Logo href={links.HOME_PAGE}>{t('Header.title')}</Logo>
    </HeaderItem>
  );
}
