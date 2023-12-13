'use client';

import { Link, Box, Typography } from '@mui/material';
import { notFound } from 'next/navigation';

import { useEffect, useState } from 'react';

import { LoadingScreen } from 'components/loading-screen';
import PagesContainer from 'components/PagesContainer/PagesContainer';
import { PolicyComponent } from 'components/PolicyComponent/PolicyComponent';
import SignUpForm from 'components/SignUpForm/SignUpForm';
import { SnackbarProvider } from 'components/snackbar';
import { AppRoute } from 'enums';
import { getDictionary } from 'lib/dictionary';
import { Locale } from 'locales/i18n.config';
import { SignUpPageType } from 'types/auth';

import { SignInLink, Policy, StyledBox } from './styles';

type Props = {
  params: { locale: Locale };
};

export default function SignUpPage({ params: { locale } }: Props) {
  const [data, setData] = useState<SignUpPageType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { signUpPage } = await getDictionary('en');

        setData(signUpPage);
      } catch (error) {
        notFound();
      }
    };

    fetchData();
  }, [locale]);

  if (!data) {
    return <LoadingScreen />;
  }

  return (
    <PagesContainer>
      <StyledBox>
        <Typography variant="h3" sx={{ marginBottom: '1.5rem' }}>
          {data.Main.title}
        </Typography>
        <SnackbarProvider>
          <SignUpForm signUpPage={data} />
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
            <Link href={AppRoute.SIGN_IN_PAGE} color="primary">
              {data.Main.signInLink}
            </Link>
          </SignInLink>
          <Policy>
            <PolicyComponent signUpPage={data} />
          </Policy>
        </Box>
      </StyledBox>
    </PagesContainer>
  );
}
