'use client';
import { Locale } from 'locales/i18n.config';
import { getDictionary } from 'lib/dictionary';
import { Wrapper, LeftSection, RestoreWrapper, RightSection } from './styles';
import RestorePasswordForm from './components/form';
import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';

type Props = {
  params: { lang: Locale };
};
type RestorePasswordPageType = {
  RestorePasswordForm: {
    [key: string]: string;
  };
};

export default function RestorePasswordPage({ params: { lang } }: Props) {
  const [data, setData] = useState<RestorePasswordPageType | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { RestorePasswordPage } = await getDictionary(lang);
        setData(RestorePasswordPage);
      } catch (error) {
        notFound();
      }
    };

    fetchData();
  }, [lang]);

  if (!data) {
    return <div>Loading...</div>;
  }
  return (
    <Wrapper>
      <LeftSection></LeftSection>
      <RightSection>
        <RestoreWrapper>
          <RestorePasswordForm RestorePasswordPage={data} />
        </RestoreWrapper>
      </RightSection>
    </Wrapper>
  );
}
