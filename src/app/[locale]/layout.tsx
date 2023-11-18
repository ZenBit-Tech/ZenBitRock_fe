import 'modern-normalize/modern-normalize.css';
import { NextIntlClientProvider } from 'next-intl';
import StyledComponentsRegistry from 'lib/registry';
import { LocalizationProvider } from 'locales';
import TestHeader from 'components/Test-Header';
import ToastContainerWrapper from 'components/toast-container';
import ThemeProvider from 'theme';
import { Locale } from 'locales/i18n.config';
import './global.css';

export const metadata = {
  title: 'ZenBitRock',
  description: 'ZenBitRock website',
  icons: [
    {
      rel: 'icon',
      url: '/favicon/icon.ico',
    },
  ],
};

type Props = {
  children: React.ReactNode;
  params: { locale: Locale };
};

export default async function RootLayout({
  children,
  params: { locale },
}: Props): Promise<JSX.Element> {
  let localeData;
  try {
    localeData = (await import(`locales/langs/${locale}.json`)).default;
  } catch (error) {
    throw error;
  }

  return (
    <html lang={locale}>
      <body>
        <LocalizationProvider>
          <ThemeProvider>
            <StyledComponentsRegistry>
              <NextIntlClientProvider locale={locale} messages={localeData}>
                <TestHeader />
                {children}
              </NextIntlClientProvider>
            </StyledComponentsRegistry>
          </ThemeProvider>
        </LocalizationProvider>
        <ToastContainerWrapper />
      </body>
    </html>
  );
}
