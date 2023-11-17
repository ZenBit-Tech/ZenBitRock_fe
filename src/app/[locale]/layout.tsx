// i18n
import 'locales/i18n';

import './global.css';
import 'modern-normalize/modern-normalize.css';
import StyledComponentsRegistry from 'lib/registry';
import { Locale, generateStaticParams } from 'locales/i18n.config';
import { LocalizationProvider } from 'locales';
import { SettingsProvider, SettingsValueProps } from 'components/settings';
import ThemeProvider from 'theme';
import Header from 'components/Header/Header';

export const metadata = {
  title: 'ZenbitRock',
  description: 'ZenbitRock website',
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

const defaultSettings: SettingsValueProps = {
  themeMode: 'light', // 'light' | 'dark'
  themeDirection: 'ltr', //  'rtl' | 'ltr'
  themeContrast: 'default', // 'default' | 'bold'
  themeLayout: 'vertical', // 'vertical' | 'horizontal' | 'mini'
  themeColorPresets: 'default', // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
  themeStretch: false,
};

generateStaticParams();

export default function RootLayout({ children, params }: Props) {
  return (
    <html lang={params.locale}>
      <body>
        <LocalizationProvider>
          <SettingsProvider defaultSettings={defaultSettings}>
            <ThemeProvider>
              <StyledComponentsRegistry>
                <Header lang={params.locale} />
                {children}
              </StyledComponentsRegistry>
            </ThemeProvider>
          </SettingsProvider>
        </LocalizationProvider>
      </body>
    </html>
  );
}
