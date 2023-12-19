import { QobrixLead } from 'types';
import { toTitleCase } from 'utils';
import { Grid, Typography } from '@mui/material';
import { useTranslations } from 'hooks';
import { LeadFeaturesSectionKeys } from 'constants/lead-features-section-keys.const';
import { LeadDetailsInfoBlock } from './lead-details-info-block';

type Props = { lead: QobrixLead };

const LeadDetailsFeaturesSection = ({ lead }: Props) => {
  const t = useTranslations('leadDetailsPage');

  return (
    <>
      <Typography variant="h4" color="text.secondary">
        {t('features')}
      </Typography>
      <Grid container spacing={1}>
        {LeadFeaturesSectionKeys.map((key) => {
          const value = lead[key];

          if (value) {
            return (
              <Grid item xs={6} sm={4} key={key}>
                <LeadDetailsInfoBlock
                  label={toTitleCase(key)}
                  info={toTitleCase(value.toString())}
                  display="block"
                />
              </Grid>
            );
          }

          return undefined;
        })}
      </Grid>
    </>
  );
};

export { LeadDetailsFeaturesSection };
