import { Logo, TestHeaderItem } from './styles';
import { Locale } from 'locales/i18n.config';
import { getDictionary } from 'lib/dictionary';
import LocaleSwitcher from 'components/locale-switcher';

type Props = {
  lang: Locale;
};

export default async function TestHeader({ lang }: Props) {
  const { Home } = await getDictionary(lang);
  return (
    <TestHeaderItem>
      <Logo href="/">{Home.Header.title}</Logo>
      <LocaleSwitcher />
    </TestHeaderItem>
  );
}
