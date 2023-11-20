import { NextIntlClientProvider } from 'next-intl';
import 'modern-normalize/modern-normalize.css';
import StyledComponentsRegistry from 'lib/registry';
import { LocalizationProvider } from 'locales';
import ToastContainerWrapper from 'components/toast-container';
import Header from 'components/Header/Header';
import ThemeProvider from 'theme';
import { Locale } from 'locales/i18n.config';
import './global.css';
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
                <Header />
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
