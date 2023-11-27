'use client';

import { RootState } from 'store';
import { useSelector } from 'hooks';
import { ProtectedRoute } from 'components/custom';

export default function MainPage() {
  const auth = useSelector((state: RootState) => state.authSlice);

  return (
    <ProtectedRoute>
      <p>{auth.email}</p>
    </ProtectedRoute>
  );
}
