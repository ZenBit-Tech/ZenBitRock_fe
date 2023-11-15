import 'modern-normalize/modern-normalize.css';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import TestHeader from 'components/Test-Header';
import './global.css';
import { Locale, generateStaticParams } from 'locales/i18n.config';
import StyledComponentsRegistry from 'lib/registry';

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
        <StyledComponentsRegistry>
          <NextIntlClientProvider locale={locale} messages={localeData}>
            <TestHeader />
            {children}
          </NextIntlClientProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
