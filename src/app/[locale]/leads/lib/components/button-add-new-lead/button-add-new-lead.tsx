'use client';

import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Iconify from 'components/iconify';
import { endpoints } from 'utils/axios';

const URL = endpoints.lead;

function ButtonAddNewLead() {
  const t = useTranslations('leads');

  const router = useRouter();

  return (
    <Button
      title={t('create')}
      sx={{ padding: '14px' }}
      variant="contained"
      color="primary"
      onClick={() => router.push(`${URL.create}`)}
    >
      <Iconify icon="gala:add" height="auto" />
    </Button>
  );
}

export { ButtonAddNewLead };
