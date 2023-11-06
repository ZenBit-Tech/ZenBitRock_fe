import { getDictionary } from 'lib/dictionary';
import Main from './components/Main';

type Props = {
  params: { lang: Locale };
};

export default function TestPage({ params: { lang } }: Props): JSX.Element {
  return <Main lang={lang} />;
}
