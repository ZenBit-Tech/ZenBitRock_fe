'use client';

import { useSelector } from 'hooks';
import { VerificationDoneView, VerificationView } from 'sections';
import { RootState } from 'store';

export default function VerificationPage(): JSX.Element {
  const user = useSelector((state: RootState) => state.authSlice.user);
  const isKycFilled = user ? user.firstName && user.lastName : false;

  return isKycFilled ? <VerificationDoneView /> : <VerificationView />;
}
