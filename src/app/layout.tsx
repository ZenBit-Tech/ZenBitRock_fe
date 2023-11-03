import './global.css';
import 'modern-normalize/modern-normalize.css';
import StyledComponentsRegistry from 'lib/registry';
import 'locales/i18n';
import { LocalizationProvider } from 'locales';

export const metadata = {
  title: 'Agent wise',
  description: 'Agent wise website',
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props): JSX.Element {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <LocalizationProvider>{children}</LocalizationProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
