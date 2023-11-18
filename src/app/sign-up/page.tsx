'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, Box } from '@mui/material';
import ReduxProvider from 'store/ReduxProvider';
import PagesContainer from 'components/PagesContainer/PagesContainer';
import TermsDialog from 'components/TermsDialog/TermsDialog';
import PrivacyPolicyDialog from 'components/PrivacyPolicyDialog/PrivacyPolicyDialog';
import PageTitle from 'components/PageTitle/PageTitle';
import SignUpForm from 'components/SignUpForm/SignUpForm';
import { LoadingScreen } from 'components/loading-screen';
import { pageLinks } from 'constants/pageLinks';
import { SignInLink, Policy } from './styles';

type SignUpPageType = {
  Main: {
    [key: string]: string;
  };
  Terms: {
    [key: string]: string;
  };
  TermsContent: {
    [key: string]: string;
  };
};

export default function SignUpPage() {
  const [data, setData] = useState<SignUpPageType | null>(null);
  const t = useTranslations('signUpPage');

  if (data) {
    return <LoadingScreen />;
  }

  return (
    <>
      <PagesContainer>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flex: '1',
            paddingTop: '2rem',
            alignItems: 'center',
          }}
        >
          <PageTitle title={t('Main.title')} />
          <ReduxProvider>
            <SignUpForm />
          </ReduxProvider>
          <SignInLink>
            {t('Main.haveAcc')}&nbsp;
            <Link href={pageLinks.SIGN_IN_PAGE} color="primary">
              {t('Main.signInLink')}
            </Link>
          </SignInLink>

          <Policy>
            {t('Main.agree')}&nbsp;
            <TermsDialog />
            &nbsp;{t('Main.and')}&nbsp;
            <PrivacyPolicyDialog />
          </Policy>
        </Box>
      </PagesContainer>
    </>
  );
}
