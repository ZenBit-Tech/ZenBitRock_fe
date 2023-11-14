// i18n
import 'locales/i18n';

import './global.css';
import 'modern-normalize/modern-normalize.css';
import StyledComponentsRegistry from 'lib/registry';
import { Locale, generateStaticParams } from 'locales/i18n.config';
import TestHeader from 'components/Test-Header';
import { LocalizationProvider } from 'locales';
import { SettingsProvider, SettingsValueProps } from 'components/settings';
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
                <TestHeader locale={params.locale} />
                {children}
              </StyledComponentsRegistry>
            </ThemeProvider>
          </SettingsProvider>
        </LocalizationProvider>
      </body>
    </html>
  );
}
