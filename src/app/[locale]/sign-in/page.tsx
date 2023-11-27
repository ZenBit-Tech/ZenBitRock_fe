'use client';

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import Link from '@mui/material/Link';
import { Box } from '@mui/material';
import ReduxProvider from 'store/ReduxProvider';
import { Locale } from 'locales/i18n.config';
import { getDictionary } from 'lib/dictionary';
import { links } from 'constants/links';
import SeoIllustration from 'assets/illustrations/seo-illustration';
import { LoadingScreen } from 'components/loading-screen';
import LoginForm from './components/form';
import { PolicyComponent } from 'components/PolicyComponent/PolicyComponent';
import { SnackbarProvider } from 'components/snackbar';
import { SignInPageType, SignUpPageType } from 'types/auth';
import { Wrapper, LeftSection, LoginWrapper, RightSection, SignUpLink, Policy } from './styles';

type Props = {
  params: { lang: Locale };
};

export default function SignInPage({ params: { lang } }: Props) {
  const [data, setData] = useState<SignInPageType | null>(null);
  const [termsData, setTermsData] = useState<SignUpPageType | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { signInPage, signUpPage } = await getDictionary('en');
        setData(signInPage);
        setTermsData(signUpPage);
      } catch (error) {
        notFound();
      }
    };
    fetchData();
  }, [lang]);

  if (!data || !termsData) {
    return <LoadingScreen />;
  }

  return (
    <Wrapper>
      <LeftSection>
        <SeoIllustration maxWidth="80%" />
      </LeftSection>
      <RightSection>
        <LoginWrapper>
          <SnackbarProvider>
            <ReduxProvider>
              <LoginForm />
            </ReduxProvider>
          </SnackbarProvider>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              width: '90%',
            }}
          >
            <SignUpLink>
              {data.Main.doNot}&nbsp;
              <Link href={links.SIGN_UP_PAGE}>{data.Main.signUpLink}</Link>
            </SignUpLink>
            <Policy>
              <PolicyComponent signUpPage={termsData} />
            </Policy>
          </Box>
        </LoginWrapper>
      </RightSection>
    </Wrapper>
  );
}
