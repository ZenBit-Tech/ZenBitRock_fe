'use client';

import { Container } from '@mui/material';
import { ProtectedRoute } from 'components/custom';
import ContentView from 'components/custom/content-view';

function ContentPage(): JSX.Element {
  return (
    <ProtectedRoute>
      <Container sx={{ pb: 12, px: 2 }}>
        <ContentView />
      </Container>
    </ProtectedRoute>
  );
}

export default ContentPage;
