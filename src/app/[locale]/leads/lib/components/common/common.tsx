'use client';

import { useEffect, useState } from 'react';

import { useParams, useRouter } from 'next/navigation';

import { useTranslations } from 'next-intl';

import { Button, Box, Typography } from '@mui/material';

import { LeadsFilter } from 'app/[locale]/leads/lib/components/leads-filter/leads-filter';
import { ProtectedRoute } from 'components/custom';
import LeadsList from 'components/custom/leadsList';
import Iconify from 'components/iconify';
import { AppRoute } from 'enums';
import { toTitleCase } from 'utils';

function Common(): JSX.Element {
  const [name, setName] = useState<string | undefined>(undefined);
  const [propertyId, setPropertyId] = useState<string | undefined>(undefined);
  const [filter, setFilter] = useState<string | undefined>(undefined);

  const t = useTranslations('leads');

  const { id, leads } = useParams();
  const router = useRouter();

  function getFilter(searchString: string): void {
    setFilter(searchString);
  }

  useEffect(() => {
    (() => {
      if (id && leads) {
        const query = Array.isArray(id) ? id[0] : id;

        setPropertyId(query);
        setName(decodeURIComponent(leads[1]));
      }
    })();
  }, [id, leads]);

  return (
    <ProtectedRoute>
      <Box sx={{ p: '10px', margin: '0 auto', maxWidth: '800px' }}>
        <Typography variant="h3" sx={{ marginTop: 3 }}>
          {toTitleCase(t('leads'))}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginY: '1.5rem',
          }}
        >
          <LeadsFilter getFilter={(searchString: string) => getFilter(searchString)} />
          <Button
            title={t('create')}
            sx={{ padding: '14px' }}
            variant="contained"
            color="primary"
            type="button"
            onClick={() => router.push(`${AppRoute.CREATE_LEAD_PAGE}`)}
          >
            <Iconify icon="subway:add" height="auto" />
          </Button>
        </Box>
        <LeadsList filter={filter} id={propertyId} name={name} />
      </Box>
    </ProtectedRoute>
  );
}

export { Common };
