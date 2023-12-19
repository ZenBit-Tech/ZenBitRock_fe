'use client';

import { ProtectedRoute } from 'components/custom';

import { Common } from '../../../leads/lib/components/common/common';

function LeadPage(): JSX.Element {
  return (
    <ProtectedRoute>
      <Common />
    </ProtectedRoute>
  );
}

export default LeadPage;
