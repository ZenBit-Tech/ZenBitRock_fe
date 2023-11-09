import './global.css';
import 'modern-normalize/modern-normalize.css';
import StyledComponentsRegistry from 'lib/registry';
import { Locale, generateStaticParams } from 'locales/i18n.config';
import TestHeader from 'components/Test-Header';

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

export default async function RootLayout({ children, params }: Props) {
  return (
    <html lang={params.locale}>
      <body>
        <StyledComponentsRegistry>
          <TestHeader locale={params.locale} />
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
