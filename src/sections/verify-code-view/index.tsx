'use client';

import { UploadIllustration } from 'assets/illustrations';
import { SnackbarProvider } from 'components/snackbar';
import ReduxProvider from 'store/ReduxProvider';

import Form from './form';
import { Wrapper, LeftSection, RightSection, FormWrapper } from './styles';

export default function VerifyCodeView(): JSX.Element {
  return (
    <Wrapper>
      <LeftSection>
        <UploadIllustration />
      </LeftSection>
      <RightSection>
        <SnackbarProvider>
          <ReduxProvider>
            <FormWrapper>
              <Form />
            </FormWrapper>
          </ReduxProvider>
        </SnackbarProvider>
      </RightSection>
    </Wrapper>
  );
}
