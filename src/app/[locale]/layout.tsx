import 'modern-normalize/modern-normalize.css';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import StyledComponentsRegistry from 'lib/registry';
import { LocalizationProvider } from 'locales';
import { Locale, generateStaticParams } from 'locales/i18n.config';
import TestHeader from 'components/Test-Header';
import ThemeProvider from 'theme';
import './global.css';
import ToastContainerWrapper from 'components/toast-container';

export const metadata = {
  title: 'Agent wise',
  description: 'Agent wise website',
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

generateStaticParams();

export default async function RootLayout({
  children,
  params: { locale },
}: Props): Promise<JSX.Element> {
  let localeData;

  try {
    localeData = (await import(`locales/langs/${locale}.json`)).default;
  } catch (error) {
    notFound();
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
