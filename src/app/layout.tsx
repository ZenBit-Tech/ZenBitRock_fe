import 'modern-normalize/modern-normalize.css';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import TestHeader from 'components/Test-Header';
import './global.css';
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
};

export default async function RootLayout({ children }: Props): Promise<JSX.Element> {
  let localeData;

  try {
    localeData = (await import(`locales/langs/en.json`)).default;
  } catch (error) {
    notFound();
  }
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <NextIntlClientProvider locale="en" messages={localeData}>
            <TestHeader />
            {children}
          </NextIntlClientProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
