'use client';

import { useTranslations } from 'next-intl';
import { Link, Wrapper } from './styles';

export default function HomePage(): JSX.Element {
  const t = useTranslations('Home');

  return (
    <Wrapper>
      <h1>{t('Page.title')}</h1>
      <Link href="testpage">{t('Page.link')}</Link>
    </Wrapper>
  );
}
