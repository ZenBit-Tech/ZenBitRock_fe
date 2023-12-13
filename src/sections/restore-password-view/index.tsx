'use client';

import MaintenanceIllustration from 'assets/illustrations/maintenance-illustration';
import { SnackbarProvider } from 'components/snackbar';
import ReduxProvider from 'store/ReduxProvider';

import Form from './form';
import { Wrapper, LeftSection, RightSection, FormWrapper } from './styles';

export default function RestorePasswordView(): JSX.Element {
  return (
    <Wrapper>
      <LeftSection>
        <MaintenanceIllustration />
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
