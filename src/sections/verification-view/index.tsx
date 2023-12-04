'use client';

import Container from '@mui/material/Container';
import ReduxProvider from 'store/ReduxProvider';
import { SnackbarProvider } from 'notistack';
import Form from './form';

export default function VerificationView() {
  return (
    <ReduxProvider>
      <Container sx={{ my: 5 }}>
        <SnackbarProvider>
          <Form />
        </SnackbarProvider>
      </Container>
    </ReduxProvider>
  );
}
