'use client';

import MaintenanceIllustration from 'assets/illustrations/maintenance-illustration';
import ReduxProvider from 'store/ReduxProvider';
import { SnackbarProvider } from 'components/snackbar';
import { Wrapper, LeftSection, RightSection } from './styles';
import Form from './form';

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
