'use client';

import ReduxProvider from 'store/ReduxProvider';
import { SnackbarProvider } from 'components/snackbar';
import { UploadIllustration } from 'assets/illustrations';
import { Wrapper, LeftSection, RightSection } from './styles';
import Form from './form';

export default function VerifyCodeView(): JSX.Element {
  return (
    <Wrapper>
      <LeftSection>
        <UploadIllustration />
      </LeftSection>
      <RightSection>
        <SnackbarProvider>
          <ReduxProvider>
            <Form />
          </ReduxProvider>
        </SnackbarProvider>
      </RightSection>
    </Wrapper>
  );
}
