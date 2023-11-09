import { Locale } from 'locales/i18n.config';
import { getDictionary } from 'lib/dictionary';
import { Link, Wrapper } from './styles';

type Props = {
  params: { lang: Locale };
};

export default async function HomePage({ params: { lang } }: Props) {
  const { Home } = await getDictionary(lang);

  return (
    <Wrapper>
      <h1>{Home.Page.title}</h1>
      <Link href="testpage">{Home.Page.link}</Link>
    </Wrapper>
  );
}
