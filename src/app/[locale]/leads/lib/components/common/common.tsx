'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Button, Box, Typography, Container, Backdrop, CircularProgress } from '@mui/material';
import {
  DELAY,
  GoBackPageTitile,
  Onboarding,
  ProtectedRoute,
  useOnboardingContext,
} from 'components/custom';
import LeadsList from 'components/custom/leadsList';
import { useMount } from 'hooks';
import { AppRoute } from 'enums';
import { toTitleCase } from 'utils';
import { LeadsFilter } from '../leads-filter/leads-filter';

function Common(): JSX.Element {
  const [name, setName] = useState<string | undefined>(undefined);
  const [propertyId, setPropertyId] = useState<string | undefined>(undefined);
  const [filter, setFilter] = useState<string | undefined>(undefined);
  const [showLoader, setLoader] = useState<boolean>(true);
  const {
    setState,
    state: { tourActive, stepIndex },
  } = useOnboardingContext();

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

  useMount(() => {
    if (tourActive) {
      setTimeout(() => {
        setLoader(false);
        setState({ run: true, stepIndex: 5 });
      }, DELAY);
    }
  });

  return (
    <ProtectedRoute>
      {((showLoader && tourActive) || stepIndex === 8) && (
        <Backdrop open sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}>
          <CircularProgress color="primary" />
        </Backdrop>
      )}
      <Onboarding />
      <Container sx={{ pb: 8, px: 2 }} className="onboarding-step-6">
        {propertyId && <GoBackPageTitile title={toTitleCase(t('leads'))} />}
        {!propertyId && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mt: '1.5rem',
              mb: '1.5rem',
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
        )}

        <Box
          sx={{
            mb: '1.5rem',
          }}
        >
          <LeadsFilter getFilter={(searchString: string) => getFilter(searchString)} />
        </Box>
        <LeadsList tourActive={tourActive} filter={filter} name={name} />
      </Container>
    </ProtectedRoute>
  );
}

export { Common };
