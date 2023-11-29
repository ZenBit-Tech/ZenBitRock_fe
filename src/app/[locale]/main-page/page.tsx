'use client';

import { Navbar, ProtectedRoute } from 'components/custom';

export default function MainPage() {
  return (
    <ProtectedRoute>
      <Navbar />
    </ProtectedRoute>
  );
}
