'use client';

import Container from '@mui/material/Container';
import ReactHookForm from './react-hook-form';
import ReduxProvider from 'store/ReduxProvider';

export default function VerificationView() {
  return (
    <>
      <ReduxProvider>
        <Container sx={{ my: 5 }}>
          <ReactHookForm />
        </Container>
      </ReduxProvider>
    </>
  );
}
