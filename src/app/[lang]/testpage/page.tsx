import Main from './components/Main';
import { Locale } from 'locales/i18n.config';

type Props = {
  params: { lang: Locale };
};

export default function TestPage({ params: { lang } }: Props): JSX.Element {
  return <Main lang={lang} />;
}
