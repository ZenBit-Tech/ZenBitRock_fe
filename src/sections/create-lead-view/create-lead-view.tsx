'use client';

import Container from '@mui/material/Container';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { LoadingScreen } from 'components/loading-screen';
import Form from './form';

export default function CreateLeadView(): JSX.Element {
  const authUser = useSelector((state: RootState) => state.authSlice.user);

  if (!authUser) {
    return <LoadingScreen sx={{ mt: 'calc(100vh / 2 - 65px)' }} />;
  }

  return (
    <Container>
      <Form user={authUser} />
    </Container>
  );
}
