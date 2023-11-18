import 'modern-normalize/modern-normalize.css';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import StyledComponentsRegistry from 'lib/registry';
import Header from 'components/Header/Header';
import './global.css';
import ThemeProvider from 'theme';

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
        <ThemeProvider>
          <StyledComponentsRegistry>
            <NextIntlClientProvider locale="en" messages={localeData}>
              <Header />
              {children}
            </NextIntlClientProvider>
          </StyledComponentsRegistry>
        </ThemeProvider>
      </body>
    </html>
  );
}
