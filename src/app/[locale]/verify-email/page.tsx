'use client';

import { useSelector } from 'react-redux';
import { VerifyView } from './components';
import { RootState } from 'store';
import { useRouter } from 'next/navigation';
import { pageLinks } from 'constants/pageLinks';
import { useEffect } from 'react';

export default function ClassicVerifyPage() {
  const email = useSelector((state: RootState) => state.authSlice.email);
  const router = useRouter();

  useEffect(() => {
    if (!email) {
      router.push(pageLinks.SIGN_IN_PAGE);
    }
  }, [email]);

  return <>{email && <VerifyView email={email} />}</>;
}
