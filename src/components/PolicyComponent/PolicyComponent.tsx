import { FC } from 'react';
import TermsDialog from 'components/TermsDialog/TermsDialog';
import PrivacyPolicyDialog from 'components/PrivacyPolicyDialog/PrivacyPolicyDialog';
import { SignUpPageType } from 'types/auth';

type PolicyProps = {
  signUpPage: SignUpPageType;
};

export const PolicyComponent: FC<PolicyProps> = ({ signUpPage }) => (
  <>
    {signUpPage.Main.agree}&nbsp;
    <TermsDialog SignUpPage={signUpPage} />
    &nbsp;{signUpPage.Main.and}&nbsp;
    <PrivacyPolicyDialog SignUpPage={signUpPage} />
  </>
);
