'use client';

import Container from '@mui/material/Container';
import Form from './form';
import ReduxProvider from 'store/ReduxProvider';
import ReactHookForm from './react-hook-form';

export default function VerificationView() {
  return (
      <ReduxProvider>
        <Container sx={{ my: 5 }}>
          <Form />
        </Container>
      </ReduxProvider>
  );
}
