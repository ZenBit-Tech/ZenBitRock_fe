import { Grid, Typography } from '@mui/material';
import { QobrixLead } from 'types';
import { useTranslations } from 'hooks';
import { toTitleCase } from 'utils';
import { colors } from 'constants/colors';
import { LeadDetailsInfoBlock } from './lead-details-info-block';

type Props = { lead: QobrixLead };

const LeadDetailsSourceSection = ({ lead }: Props) => {
  const t = useTranslations('leadDetailsPage');

  return (
    <>
      {lead.source && (
        <>
          <Typography variant="h5" color="text.secondary">
            {t('sourceDetails')}
          </Typography>
          <Grid
            container
            spacing={1}
            sx={{
              '::after': {
                width: '100%',
                marginTop: 1,
                content: '""',
                height: '1px',
                background: `linear-gradient(90deg, ${colors.PRIMARY_LIGHT_COLOR} 0%,${colors.BUTTON_PRIMARY_COLOR} 50%,${colors.PRIMARY_LIGHT_COLOR} 100%)`,
              },
            }}
          >
            <Grid item xs={12} sm={6}>
              <LeadDetailsInfoBlock label={t('source')} info={toTitleCase(lead.source)} />
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export { LeadDetailsSourceSection };
