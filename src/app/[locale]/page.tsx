import { Locale } from 'locales/i18n.config';
import { getDictionary } from 'lib/dictionary';
import { Link, Wrapper } from './styles';
import { notFound } from 'next/navigation';

type Props = {
  params: { locale: Locale };
};

export default async function HomePage({ params: { locale } }: Props): Promise<JSX.Element> {
  let localeData;

  try {
    const { Home } = await getDictionary(locale);
    localeData = Home;
  } catch (error) {
    notFound();
  }

  return (
    <Wrapper>
      <h1>{localeData.Page.title}</h1>
      <Link href="testpage">{localeData.Page.link}</Link>
    </Wrapper>
  );
}
