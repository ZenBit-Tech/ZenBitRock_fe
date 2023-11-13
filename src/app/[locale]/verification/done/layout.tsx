import { Locale, generateStaticParams } from 'locales/i18n.config';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Verification',
};

type Props = {
  children: React.ReactNode;
  params: { locale: Locale };
};

generateStaticParams();

export default async function VerificationLayout({
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
    <NextIntlClientProvider locale={locale} messages={localeData}>
      {children}
    </NextIntlClientProvider>
  );
}
