'use client';

import { useTranslations } from 'next-intl';

export default function Filter(): JSX.Element {
  const t = useTranslations('Home');
  return <p>Filter</p>;
}
