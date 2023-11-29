'use client';

import { RootState } from 'store';
import { AppRoute } from 'enums';
import { useEffect, useRouter, useSelector } from 'hooks';
import { VerifyView } from './components';

export default function ClassicVerifyPage() {
  const email = useSelector((state: RootState) => state.authSlice.email);
  const router = useRouter();

  useEffect(() => {
    if (!email) {
      router.push(AppRoute.SIGN_IN_PAGE);
    }
  }, [email, router]);

  return <>{email && <VerifyView email={email} />}</>;
}
