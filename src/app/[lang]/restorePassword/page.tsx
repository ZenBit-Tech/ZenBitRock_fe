'use client';
import { Locale } from 'locales/i18n.config';
import { getDictionary } from 'lib/dictionary';
import { Wrapper, LeftSection, LoginWrapper, RightSection } from './styles';
import RestorePasswordForm from './components/form';

type Props = {
  params: { lang: Locale };
};

export default function RestorePasswordPage({ params: { lang } }: Props) {
  return (
    <Wrapper>
      <LeftSection></LeftSection>
      <RightSection>
        <LoginWrapper>
          <RestorePasswordForm />
        </LoginWrapper>
      </RightSection>
    </Wrapper>
  );
}
