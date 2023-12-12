'use client';

import { Box, Typography } from '@mui/material';
import LeadsList from 'components/custom/leadsList';
import { ProtectedRoute } from 'components/custom';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ButtonAddNewLead, LeadsFilter } from '../..';

function Common(): JSX.Element {
  const [name, setName] = useState<string | undefined>(undefined);
  const [propertyId, setPropertyId] = useState<string | undefined>(undefined);
  const [filter, setFilter] = useState<string | undefined>(undefined);

  const { id } = useParams();

  useEffect(() => {
    (() => {
      if (id) {
        const query = Array.isArray(id) ? id[0] : id;

        setPropertyId(query.split('--')[0]);
        setName(query.split('--')[1].split('%20').join(' '));
      }
    })();
  }, [id]);

  return (
    <ProtectedRoute>
      <Box sx={{ p: '10px', margin: '0 auto', maxWidth: '800px' }}>
        <Typography variant="h3" sx={{ marginTop: 3 }}>
          Leads
        </Typography>
        <Box>
          <LeadsFilter />
          <ButtonAddNewLead />
        </Box>
        <LeadsList filter={filter} id={propertyId} name={name} />
      </Box>
    </ProtectedRoute>
  );
}

export { Common };
