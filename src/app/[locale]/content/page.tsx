'use client';

import { ProtectedRoute } from 'components/custom';
import ContentView from 'components/custom/content-view';

function ContentPage(): JSX.Element {
  return (
    <ProtectedRoute>
      <ContentView />
    </ProtectedRoute>
  );
}

export default ContentPage;
