import { notFound } from 'next/navigation';
import { Locale } from 'locales/i18n.config';
import { getDictionary } from 'lib/dictionary';
import LocaleSwitcher from 'components/locale-switcher';
import { Logo, TestHeaderItem } from './styles';

type Props = {
  lang: Locale;
};

export default async function TestHeader({ lang }: Props) {
  try {
    const { Home } = await getDictionary(lang);
    return (
      <TestHeaderItem>
        <Logo href="/">{Home.Header.title}</Logo>
        <LocaleSwitcher />
      </TestHeaderItem>
    );
  } catch (error) {
    notFound();
  }
}
