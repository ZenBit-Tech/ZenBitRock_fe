'use client';

import { Locale } from 'locales/i18n.config';
import { getDictionary } from 'lib/dictionary';
import PagesContainer from 'components/PagesContainer/PagesContainer';
import PageTitle from 'components/PageTitle/PageTitle';
import SignUpForm from 'components/SignUpForm/SignUpForm';
import { SignInLink, Policy } from './styles';
import { Link, Box } from '@mui/material';

type Props = {
  params: { lang: Locale };
};

export default async function SignUpPage({ params: { lang } }: Props) {
  const { SignInPage, SignUpPage } = await getDictionary(lang);
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
          <PageTitle title={SignUpPage.title} />
          <SignUpForm SignUpPage={SignUpPage} />
          <SignInLink>
            {SignUpPage.haveAcc}&nbsp;
            <Link href="/sign-in" color="primary">
              {SignUpPage.signInLink}
            </Link>
          </SignInLink>

          <Policy>
            {SignInPage.agree}&nbsp;
            <Link href="/testpage">{SignInPage.termsLink}</Link>
            &nbsp;{SignInPage.and}&nbsp;
            <Link href="/testpage">{SignInPage.policyLink}</Link>
          </Policy>
        </Box>
      </PagesContainer>
    </>
  );
}
