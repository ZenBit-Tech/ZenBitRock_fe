'use client';

import Container from '@mui/material/Container';
import Form from './form';

type Props = {
  handleVerification: () => void;
};

export function VerificationView({ handleVerification }: Props) {
  return (
    <Container sx={{ my: 5 }}>
      <Form handleVerification={handleVerification} />
    </Container>
  );
}
