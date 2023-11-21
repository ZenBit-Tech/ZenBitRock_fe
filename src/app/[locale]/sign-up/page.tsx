'use client';
import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { Link, Box } from '@mui/material';
import { Locale } from 'locales/i18n.config';
import { getDictionary } from 'lib/dictionary';
import ReduxProvider from 'store/ReduxProvider';
import PagesContainer from 'components/PagesContainer/PagesContainer';
import TermsDialog from 'components/TermsDialog/TermsDialog';
import PrivacyPolicyDialog from 'components/PrivacyPolicyDialog/PrivacyPolicyDialog';
import PageTitle from 'components/PageTitle/PageTitle';
import SignUpForm from 'components/SignUpForm/SignUpForm';
import { LoadingScreen } from 'components/loading-screen';
import { links } from 'constants/links';
import { SignInLink, Policy } from './styles';
type Props = {
  params: { lang: Locale };
};
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
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flex: '1',
            paddingTop: '2rem',
            alignItems: 'center',
          }}
        >
          <PageTitle title={data.Main.title} />
          <ReduxProvider>
            <SignUpForm SignUpPage={data} />
          </ReduxProvider>
          <SignInLink>
            {data.Main.haveAcc}&nbsp;
            <Link href={links.SIGN_IN_PAGE} color="primary">
              {data.Main.signInLink}
            </Link>
          </SignInLink>
          <Policy>
            {data.Main.agree}&nbsp;
            <TermsDialog SignUpPage={data} />
            &nbsp;{data.Main.and}&nbsp;
            <PrivacyPolicyDialog SignUpPage={data} />
          </Policy>
        </Box>
      </PagesContainer>
    </>
  );
}
