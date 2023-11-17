import { Logo, TestHeaderItem } from './styles';
import { Locale } from 'locales/i18n.config';
import { getDictionary } from 'lib/dictionary';
import LocaleSwitcher from 'components/locale-switcher';
import { notFound } from 'next/navigation';

type Props = {
  locale: Locale;
};

export default async function TestHeader({ locale }: Props): Promise<JSX.Element> {
  let localeData;

  try {
    const { Home } = await getDictionary(locale);
    localeData = Home;
  } catch (error) {
    notFound();
  }

  return (
    <TestHeaderItem>
      <Logo href="/">{Home.Header.title}</Logo>
      <LocaleSwitcher />
    </TestHeaderItem>
  );
}
