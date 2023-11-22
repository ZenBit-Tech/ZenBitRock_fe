'use client';

import MaintenanceIllustration from 'assets/illustrations/maintenance-illustration';
import { Wrapper, LeftSection, RightSection } from './styles';
import Form from './form';
import ReduxProvider from 'store/ReduxProvider';
import { SnackbarProvider } from 'components/snackbar';

export default function RestorePasswordView(): JSX.Element {
  return (
    <Wrapper>
      <LeftSection>
        <MaintenanceIllustration />
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
