'use client';

import { ProtectedRoute } from 'components/custom';
import { Common } from './lib/components/common/common';

function LeadsPage(): JSX.Element {
  return (
    <ProtectedRoute>
      <Common />
    </ProtectedRoute>
  );
}

export default LeadsPage;
