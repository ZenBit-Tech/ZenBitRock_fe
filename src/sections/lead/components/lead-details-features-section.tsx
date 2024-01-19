import { QobrixLead } from 'types';
import { toTitleCase } from 'utils';
import { Grid, Typography } from '@mui/material';
import { useTranslations } from 'hooks';
import { colors } from 'constants/colors';
import { LeadFeaturesSectionKeys } from 'constants/lead-features-section-keys.const';
import { LeadDetailsInfoBlock } from './lead-details-info-block';

type Props = { lead: QobrixLead };

const LeadDetailsFeaturesSection = ({ lead }: Props) => {
  const t = useTranslations('leadDetailsPage');

  return (
    <>
      <Typography variant="h5" color="text.secondary">
        {t('features')}
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
        {LeadFeaturesSectionKeys.map((key) => {
          const value = lead[key];

          if (value) {
            return (
              <Grid item xs={12} sm={6} key={key}>
                <LeadDetailsInfoBlock
                  label={toTitleCase(key)}
                  info={toTitleCase(value.toString())}
                  grid
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
