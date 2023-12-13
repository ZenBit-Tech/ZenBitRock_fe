'use client';

import MaintenanceIllustration from 'assets/illustrations/maintenance-illustration';
import ReduxProvider from 'store/ReduxProvider';
import { SnackbarProvider } from 'components/snackbar';
import { Wrapper, LeftSection, RightSection, FormWrapper } from './styles';
import Form from './form';

export default function ChangePasswordView(): JSX.Element {
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
