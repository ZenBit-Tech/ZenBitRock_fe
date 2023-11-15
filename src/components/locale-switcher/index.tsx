'use client';

import { usePathname } from 'next/navigation';
import { i18n } from 'locales/i18n.config';
import { Button, Link } from '@mui/material';

export default function LocaleSwitcher() {
  const pathName = usePathname();

  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/';
    const segments = pathName.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  return (
    <div>
      {i18n.locales.map((locale) => {
        return (
          <Button key={locale}>
            <Link underline={'none'} color="primary" href={redirectedPathName(locale)}>
              {locale}
            </Link>
          </Button>
        );
      })}
    </div>
  );
}
