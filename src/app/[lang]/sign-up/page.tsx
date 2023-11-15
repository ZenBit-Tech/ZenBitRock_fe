'use client';

import { Link, Box } from '@mui/material';
import { notFound } from 'next/navigation';
import PagesContainer from 'components/PagesContainer/PagesContainer';
import PageTitle from 'components/PageTitle/PageTitle';
import SignUpForm from 'components/SignUpForm/SignUpForm';
import TermsDialog from 'components/TermsDialog/TermsDialog';
import PrivacyPolicyDialog from 'components/PrivacyPolicyDialog/PrivacyPolicyDialog';
import { Locale } from 'locales/i18n.config';
import { getDictionary } from 'lib/dictionary';
import { pageLinks } from 'constants/pageLinks';
import { SignInLink, Policy } from './styles';

type Props = {
  params: { lang: Locale };
};

export default async function SignUpPage({ params: { lang } }: Props) {
  try {
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
            <PageTitle title={SignUpPage.Main.title} />
            <SignUpForm SignUpPage={SignUpPage} />
            <SignInLink>
              {SignUpPage.Main.haveAcc}&nbsp;
              <Link href={pageLinks.SIGN_IN_PAGE} color="primary">
                {SignUpPage.Main.signInLink}
              </Link>
            </SignInLink>

            <Policy>
              {SignInPage.agree}&nbsp;
              <TermsDialog SignUpPage={SignUpPage} />
              &nbsp;{SignInPage.and}&nbsp;
              <PrivacyPolicyDialog SignUpPage={SignUpPage} />
            </Policy>
          </Box>
        </PagesContainer>
      </>
    );
  } catch (error) {
    notFound();
  }
}
