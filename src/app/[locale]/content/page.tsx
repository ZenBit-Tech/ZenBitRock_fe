'use client';

import { ProtectedRoute } from 'components/custom';

function ContentPage(): JSX.Element {
  return (
    <ProtectedRoute>
      <ContentView />
    </ProtectedRoute>
  );
}

export default ContentPage;
