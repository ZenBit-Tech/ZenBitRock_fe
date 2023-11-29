'use client';

import { useTranslations } from 'next-intl';
import { AppRoute } from 'enums';
import { Logo, HeaderItem } from './styles';

export default function Header(): JSX.Element {
  const t = useTranslations('Home');
  return (
    <HeaderItem>
      <Logo href={AppRoute.HOME_PAGE}>{t('Header.title')}</Logo>
    </HeaderItem>
  );
}
