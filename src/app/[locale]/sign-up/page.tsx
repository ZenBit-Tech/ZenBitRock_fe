'use client';

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { Link, Box, Typography } from '@mui/material';
import { Locale } from 'locales/i18n.config';
import { getDictionary } from 'lib/dictionary';
import ReduxProvider from 'store/ReduxProvider';
import PagesContainer from 'components/PagesContainer/PagesContainer';
import SignUpForm from 'components/SignUpForm/SignUpForm';
import { LoadingScreen } from 'components/loading-screen';
import { links } from 'constants/links';
import { PolicyComponent } from 'components/PolicyComponent/PolicyComponent';
import { SnackbarProvider } from 'components/snackbar';
import { SignUpPageType } from 'types/auth';
import { SignInLink, Policy, StyledBox } from './styles';

type Props = {
  params: { locale: Locale };
};

export default function SignUpPage({ params: { lang } }: Props) {
  const [data, setData] = useState<SignUpPageType | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { SignUpPage } = await getDictionary('en');
        setData(SignUpPage);
      } catch (error) {
        notFound();
      }
    };
    fetchData();
  }, [lang]);

  if (!data) {
    return <LoadingScreen />;
  }

  return (
    <>
      <PagesContainer>
        <StyledBox>
          <Typography variant="h3" sx={{ marginBottom: '1.5rem' }}>
            {data.Main.title}
          </Typography>
          <SnackbarProvider>
            <ReduxProvider>
              <SignUpForm signUpPage={data} />
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
            <SignInLink>
              {data.Main.haveAcc}&nbsp;
              <Link href={links.SIGN_IN_PAGE} color="primary">
                {data.Main.signInLink}
              </Link>
            </SignInLink>
            <Policy>
              <PolicyComponent signUpPage={data} />
            </Policy>
          </Box>
        </StyledBox>
      </PagesContainer>
    </>
  );
}
