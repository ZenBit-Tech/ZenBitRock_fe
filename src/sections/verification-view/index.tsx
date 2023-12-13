'use client';

import Container from '@mui/material/Container';
import { SnackbarProvider } from 'notistack';
import Form from './form';

type Props = {
  handleVerification: () => void;
};

export function VerificationView({ handleVerification }: Props) {
  return (
    <Container sx={{ my: 5 }}>
      <SnackbarProvider>
        <Form handleVerification={handleVerification} />
      </SnackbarProvider>
    </Container>
  );
}
