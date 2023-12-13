'use client';

import { Button } from '@mui/material';
import { useParams, usePathname } from 'next/navigation';
import { i18n } from 'locales/i18n.config';
import { colors } from 'constants/colors';

export default function LocaleSwitcher() {
  const pathName = usePathname();

  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/';
    const segments = pathName.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  function isActive(data: string): Boolean {
    const params = useParams();
    const isActive = data === params.locale;
    return isActive;
  }

  return (
    <div>
      {i18n.locales.map((locale) => {
        return (
          <Button
            key={locale}
            style={{
              color: isActive(locale) ? colors.TEST_MAIN_COLOR : colors.TEST_SECOND_COLOR,
            }}
            href={redirectedPathName(locale)}
          >
            {locale.toUpperCase()}
          </Button>
        );
      })}
    </div>
  );
}
