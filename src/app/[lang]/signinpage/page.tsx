'use client';
import { Locale } from 'locales/i18n.config';
import { getDictionary } from 'lib/dictionary';
import {
  Wrapper,
  LeftSection,
  LoginWrapper,
  RightSection,
  ForgotPassword,
  Policy,
  Link,
} from './styles';
import LoginForm from './components/form';

type Props = {
  params: { lang: Locale };
};

export default async function SignInPage({ params: { lang } }: Props) {
  const { SignInPage } = await getDictionary(lang);
  return (
    <Wrapper>
      <LeftSection></LeftSection>
      <RightSection>
        <LoginWrapper>
          <LoginForm lang={lang} />
          <ForgotPassword>
            {SignInPage.doNot}&nbsp;
            <Link href="/testpage">{SignInPage.signUpLink}</Link>
          </ForgotPassword>

          <Policy>
            {SignInPage.agree}&nbsp;
            <Link href="/testpage">{SignInPage.termsLink}</Link>&nbsp;{SignInPage.and}&nbsp;
            <Link href="/testpage">{SignInPage.policyLink}</Link>
          </Policy>
        </LoginWrapper>
      </RightSection>
    </Wrapper>
  );
}
