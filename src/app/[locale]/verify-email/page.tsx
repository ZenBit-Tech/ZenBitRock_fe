'use client';

import { AppRoute } from 'enums';
import { useEffect, useRouter, useSelector } from 'hooks';
import { RootState } from 'store';

import { VerifyView } from './components';

export default function ClassicVerifyPage() {
  const user = useSelector((state: RootState) => state.authSlice.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push(AppRoute.SIGN_IN_PAGE);
    }
  }, [user, router]);

  return <>{user && <VerifyView email={user.email} />}</>;
}
