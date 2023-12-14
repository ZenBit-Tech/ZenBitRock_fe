'use client';

import Container from '@mui/material/Container';
import { useSelector } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import { RootState } from 'store';
import { LoadingScreen } from 'components/loading-screen';
import Form from './form';

export default function CreateLeadView(): JSX.Element {
  const authUser = useSelector((state: RootState) => state.authSlice.user);

  if (!authUser) {
    return <LoadingScreen />;
  }

  return (
    <Container sx={{ my: 5 }}>
      <SnackbarProvider>
        <Form user={authUser} />
      </SnackbarProvider>
    </Container>
  );
}
