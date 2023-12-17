import { Box, Link, Stack, Typography } from '@mui/material';
import Iconify from 'components/iconify';
import { useCallback, useState, useTranslations } from 'hooks';
import { RouterLink } from 'routes/components';
import { QobrixLeadDetailsResponse } from 'types';
import { MatchingPropertiesView } from './matching-properties-view';
import { LeadDetailsBudgetSection, LeadDetailsFeaturesSection } from './components';

type Props = {
  leadDetails: QobrixLeadDetailsResponse;
};

const LeadDetailsView = ({ leadDetails }: Props) => {
  const [matchingPropertiesCount, setMatchingPropertiesCount] = useState<number | null>(null);
  const t = useTranslations('leadDetailsPage');

  const { data } = leadDetails;

  const contact = data.contact_name_contact;
  const workflow = data.conversion_status_workflow_stage;
  const propertyType = data.property_type;

  const handleSetPropertiesCount = useCallback(
    (count: number) => setMatchingPropertiesCount(count),
    [setMatchingPropertiesCount]
  );

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
          mt: 2,
        }}
      >
        <Iconify icon="eva:arrow-ios-back-fill" width={20} />
        {t('title')}
      </Link>
      <Box sx={{ m: 1, p: 1, border: '1px solid black' }}>
        <Stack spacing={2}>
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
            {propertyType && (
              <Typography variant="body2">{`${t('enquiryType')} : ${
                propertyType.name
              }`}</Typography>
            )}
            <Typography variant="body2">{`${t('matchingProperties')} : ${
              matchingPropertiesCount ?? ''
            }`}</Typography>
            <Typography variant="body2">{`${t('created')} : ${
              data.created ? new Date(data.created).toDateString() : ''
            }`}</Typography>
          </Stack>
          <LeadDetailsBudgetSection lead={data} />
          <LeadDetailsFeaturesSection lead={data} />
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
      <MatchingPropertiesView lead={data} setMatchingPropertiesCount={handleSetPropertiesCount} />
    </Box>
  );
};

export { LeadDetailsView };
