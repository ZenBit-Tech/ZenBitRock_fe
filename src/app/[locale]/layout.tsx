// 'use client';

import { NextIntlClientProvider } from 'next-intl';
import 'modern-normalize/modern-normalize.css';
import StyledComponentsRegistry from 'lib/registry';
import ToastContainerWrapper from 'components/toast-container';
import { App, OnboardingProvider } from 'components/custom';
import ThemeProvider from 'theme';
import ReduxProvider from 'store/ReduxProvider';
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
        <ThemeProvider>
          <StyledComponentsRegistry>
            <NextIntlClientProvider locale={locale} messages={localeData}>
              <ReduxProvider>
                <OnboardingProvider>
                  <App>{children}</App>
                </OnboardingProvider>
              </ReduxProvider>
            </NextIntlClientProvider>
          </StyledComponentsRegistry>
        </ThemeProvider>

        <ToastContainerWrapper />
      </body>
    </html>
  );
}
