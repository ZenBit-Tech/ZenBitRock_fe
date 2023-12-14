import { Box, Link, Stack, Typography } from '@mui/material';
import Iconify from 'components/iconify';
import { useTranslations } from 'hooks';
import { RouterLink } from 'routes/components';
import { QobrixLeadDetailsResponse } from 'types';

type Props = {
  leadDetails: QobrixLeadDetailsResponse['data'];
};

const LeadDetailsView = ({ leadDetails }: Props) => {
  const t = useTranslations('leadDetailsPage');

  const contact = leadDetails.contact_name_contact;
  const workflow = leadDetails.conversion_status_workflow_stage;

  return (
    <Box sx={{ maxWidth: 800, margin: '0 auto' }}>
      <Link
        component={RouterLink}
        href="#"
        color="inherit"
        variant="h6"
        sx={{
          alignItems: 'center',
          display: 'inline-flex',
          m: 1,
        }}
      >
        <Iconify icon="eva:arrow-ios-back-fill" width={20} />
        {t('title')}
      </Link>
      <Box sx={{ m: 1, p: 1, border: '1px solid black' }}>
        <Stack spacing={1}>
          <Typography variant="h4" color="text.secondary">
            {contact.name}
          </Typography>
          <Typography variant="body2" display="flex" gap="2px">
            {`${t('status')} :`}
            <Link
              variant="subtitle2"
              sx={{
                cursor: 'pointer',
              }}
            >
              {workflow.name}
            </Link>
          </Typography>
          <Typography variant="body2">{`${t('matchingProperties')} : 4`}</Typography>
        </Stack>
        <Link
          variant="subtitle2"
          sx={{
            cursor: 'pointer',
            mt: 4,
          }}
        >
          {t('removeLead')}
        </Link>
      </Box>
    </Box>
  );
};

export { LeadDetailsView };
