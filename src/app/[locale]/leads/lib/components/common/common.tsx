'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Button, Box, Typography, Container } from '@mui/material';
import { ProtectedRoute } from 'components/custom';
import LeadsList from 'components/custom/leadsList';
import { AppRoute } from 'enums';
import { toTitleCase } from 'utils';
import { LeadsFilter } from '../leads-filter/leads-filter';

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
      <Container sx={{ pb: 8, pt: 2, px: 2 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
          }}
        >
          <Typography variant="h3">{toTitleCase(t('leads'))}</Typography>
          <Button
            title={t('create')}
            sx={{ padding: '14px' }}
            variant="contained"
            color="primary"
            type="button"
            onClick={() => router.push(`${AppRoute.CREATE_LEAD_PAGE}`)}
          >
            {t('addBtnTxt')}
          </Button>
        </Box>
        <Box
          sx={{
            marginY: '1.5rem',
          }}
        >
          <LeadsFilter getFilter={(searchString: string) => getFilter(searchString)} />
        </Box>
        <LeadsList filter={filter} id={propertyId} name={name} />
      </Container>
    </ProtectedRoute>
  );
}

export { Common };
