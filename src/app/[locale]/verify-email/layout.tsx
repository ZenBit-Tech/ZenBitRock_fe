import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { Locale } from 'locales/i18n.config';
import { CompactLayout } from './components';

type Props = {
  children: React.ReactNode;
  params: { locale: Locale };
};

export default async function Layout({ children, params: { locale } }: Props) {
  let localeData;

  try {
    localeData = (await import(`locales/langs/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <CompactLayout>
      <NextIntlClientProvider locale={locale} messages={localeData}>
        {children}
      </NextIntlClientProvider>
    </CompactLayout>
  );
}
