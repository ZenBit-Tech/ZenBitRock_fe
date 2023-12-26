'use client';

import { Common } from 'app/[locale]/leads/lib/components/common/common';
import { ProtectedRoute } from 'components/custom';

function LeadPage(): JSX.Element {
  return (
    <ProtectedRoute>
      <Common />
    </ProtectedRoute>
  );
}

export default LeadPage;
