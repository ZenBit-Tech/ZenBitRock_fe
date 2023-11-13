import { SettingsProvider } from 'components/settings';
import { getDictionary } from 'lib/dictionary';
import ThemeProvider from 'theme';
import { Locale } from 'locales/i18n.config';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';

type Props = {
  children: React.ReactNode;
  params: { locale: Locale };
};

const VerifyEmailLayout: React.FC<Props> = async ({ children, params: { locale } }) => {
  let localeData;

  try {
    localeData = await getDictionary(locale);
  } catch (error) {
    notFound();
  }
  return (
    <SettingsProvider
      defaultSettings={{
        themeDirection: 'ltr',
        themeStretch: false,
        themeMode: 'light',
        themeColorPresets: 'default',
        themeLayout: 'horizontal',
        themeContrast: 'default',
      }}
    >
      <ThemeProvider>
        <NextIntlClientProvider locale={locale} messages={localeData}>
          {children}
        </NextIntlClientProvider>
      </ThemeProvider>
    </SettingsProvider>
  );
};

export default VerifyEmailLayout;
