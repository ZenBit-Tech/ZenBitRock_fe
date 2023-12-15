'use client';

import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { SnackbarProvider } from 'notistack';
import { RootState } from 'store';
import { LoadingScreen } from 'components/loading-screen';
import { dimensionValues } from 'constants/dimensionValues';
import { AppRoute } from 'enums';
import DesktopDialog from 'app/[locale]/sign-in/components/modal';
import Form from './form';

export default function CreateLeadView(): JSX.Element {
  const router = useRouter();

  const [open, setOpen] = useState<boolean>(false);

  const authUser = useSelector((state: RootState) => state.authSlice.user);

  useEffect(() => {
    const handleResize = (): void => {
      const { innerWidth } = window;

      setOpen(innerWidth >= dimensionValues.DESKTOP_THRESHOLD_WIDTH);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleClose = (): void => {
    setOpen(false);
    router.push(AppRoute.HOME_PAGE);
  };

  if (!authUser) {
    return <LoadingScreen />;
  }

  if (open) return <DesktopDialog open={open} onClose={handleClose} />;

  return (
    <Container sx={{ my: 5 }}>
      <SnackbarProvider>
        <Form user={authUser} />
      </SnackbarProvider>
    </Container>
  );
}
