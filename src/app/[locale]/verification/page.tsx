'use client';

import { useCallback, useState } from 'hooks';
import { VerificationDoneView, VerificationView } from 'sections';

export default function VerificationPage(): JSX.Element {
  const [verified, setVerified] = useState(false);

  const handleVerification = useCallback(() => {
    setVerified(true);
  }, [setVerified]);

  return verified ? (
    <VerificationDoneView />
  ) : (
    <VerificationView handleVerification={handleVerification} />
  );
}
