'use client';
import { Locale } from 'locales/i18n.config';
import { getDictionary } from 'lib/dictionary';
import { Wrapper, LeftSection, LoginWrapper, RightSection, SignUpLink, Policy } from './styles';
import { Link } from '@mui/material';
import LoginForm from './components/form';
import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';

type Props = {
  params: { lang: Locale };
};
type SignInPageType = {
  Main: {
    [key: string]: string;
  };
  LoginForm: {
    [key: string]: string;
  };
};

export default function SignInPage({ params: { lang } }: Props) {
  const [data, setData] = useState<SignInPageType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { SignInPage } = await getDictionary(lang);
        setData(SignInPage);
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
        <LoginWrapper>
          <LoginForm SignInPage={data} />
          <SignUpLink>
            {data.Main.doNot}&nbsp;
            <Link href="/testpage">{data.Main.signUpLink}</Link>
          </SignUpLink>

          <Policy>
            {data.Main.agree}&nbsp;
            <Link href="/testpage">{data.Main.termsLink}</Link>
            &nbsp;{data.Main.and}&nbsp;
            <Link href="/testpage">{data.Main.policyLink}</Link>
          </Policy>
        </LoginWrapper>
      </RightSection>
    </Wrapper>
  );
}
