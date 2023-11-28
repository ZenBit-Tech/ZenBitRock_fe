'use client';

import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { useRouter } from 'next/navigation';
import { AppRoute } from 'enums';
import { useEffect } from 'react';
import { VerifyView } from './components';

export default function ClassicVerifyPage() {
  const email = useSelector((state: RootState) => state.authSlice.email);
  const router = useRouter();

  useEffect(() => {
    if (!email) {
      router.push(AppRoute.SIGN_IN_PAGE);
    }
  }, [email]);

  return <>{email && <VerifyView email={email} />}</>;
}
