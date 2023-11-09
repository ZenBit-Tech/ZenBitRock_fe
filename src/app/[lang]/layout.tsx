import './global.css';
import 'modern-normalize/modern-normalize.css';
import StyledComponentsRegistry from 'lib/registry';
import { Locale, i18n } from 'locales/i18n.config';
import Header from 'components/Header';
import ThemeProvider from 'theme';

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
  params: { lang: Locale };
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default function RootLayout({ children, params }: Props) {
  return (
    <html lang={params.lang}>
      <body>
        <ThemeProvider>
          <StyledComponentsRegistry>
            <Header lang={params.lang} />
            {children}
          </StyledComponentsRegistry>
        </ThemeProvider>
      </body>
    </html>
  );
}
