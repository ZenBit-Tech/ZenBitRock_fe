'use client';

import { useEffect, useState } from 'react';
import { notFound, useRouter } from 'next/navigation';
import Link from '@mui/material/Link';
import { Box } from '@mui/material';
import { Locale } from 'locales/i18n.config';
import { getDictionary } from 'lib/dictionary';
import { AppRoute } from 'enums';
import SeoIllustration from 'assets/illustrations/seo-illustration';
import { LoadingScreen } from 'components/loading-screen';
import { PolicyComponent } from 'components/PolicyComponent/PolicyComponent';
import { SnackbarProvider } from 'components/snackbar';
import { dimensionValues } from 'constants/dimensionValues';
import { SignInPageType, SignUpPageType } from 'types/auth';
import { DesktopDialog } from 'components/custom';
import LoginForm from './components/form';
import { Wrapper, LeftSection, LoginWrapper, RightSection, SignUpLink, Policy } from './styles';

type Props = {
  params: { locale: Locale };
};

export default function SignInPage({ params: { locale } }: Props) {
  const router = useRouter();

  const [data, setData] = useState<SignInPageType | null>(null);
  const [termsData, setTermsData] = useState<SignUpPageType | null>(null);
  const [open, setOpen] = useState<boolean>(false);

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
  }, [locale]);

  useEffect(() => {
    const handleResize = (): void => {
      const { innerWidth } = window;

      setOpen(innerWidth >= dimensionValues.DESKTOP_THRESHOLD_WIDTH);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleClose = (): void => {
    setOpen(false);
    router.push(AppRoute.HOME_PAGE);
  };

  if (!data || !termsData) {
    return <LoadingScreen />;
  }

  return (
    <>
      {open && <DesktopDialog open={open} onClose={handleClose} />}
      <Wrapper>
        <LeftSection>
          <SeoIllustration maxWidth="80%" />
        </LeftSection>
        <RightSection>
          <LoginWrapper>
            <SnackbarProvider>
              <LoginForm />
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
                <Link href={AppRoute.SIGN_UP_PAGE}>{data.Main.signUpLink}</Link>
              </SignUpLink>
              <Policy>
                <PolicyComponent signUpPage={termsData} />
              </Policy>
            </Box>
          </LoginWrapper>
        </RightSection>
      </Wrapper>
    </>
  );
}
