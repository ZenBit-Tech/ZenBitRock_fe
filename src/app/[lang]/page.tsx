import { Locale } from 'locales/i18n.config';
import { getDictionary } from 'lib/dictionary';

type Props = {
  params: { lang: Locale };
};

export default async function HomePage({ params: { lang } }: Props) {
  const { Home } = await getDictionary(lang);

  return (
    <>
      <h1>{Home.Page.title}</h1>
      <a href="testpage">{Home.Page.link}</a>
    </>
  );
}
