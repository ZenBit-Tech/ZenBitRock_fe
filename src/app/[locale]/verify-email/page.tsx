'use client';

import { RootState } from 'store';
import { AppRoute } from 'enums';
import { useEffect, useRouter, useSelector } from 'hooks';
import { SnackbarProvider } from 'components/snackbar';
import { VerifyView } from './components';


export default function ClassicVerifyPage() {
  const user = useSelector((state: RootState) => state.authSlice.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push(AppRoute.SIGN_IN_PAGE);
    }
  }, [user, router]);

  return (
    <>
      {user && (
        <SnackbarProvider>
          <VerifyView email={user.email} />
        </SnackbarProvider>
      )}
    </>
  );
}
