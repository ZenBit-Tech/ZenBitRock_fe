import { QobrixLeadBuyRent, QobrixPriceKeysBuyRent } from 'enums/qobrix';
import { QobrixLead, ValueOf } from 'types';
import { toTitleCase } from 'utils';
import { Grid, Typography } from '@mui/material';
import { useTranslations } from 'hooks';
import { LeadBuyRentInfo } from './lead-buy-rent-info';
import { LeadDetailsInfoBlock } from './lead-details-info-block';

type Props = { lead: QobrixLead };

const LeadDetailsBudgetSection = ({ lead }: Props) => {
  const buyRent = lead.buy_rent;
  const isValidBuyRent = buyRent && Object.keys(QobrixPriceKeysBuyRent).includes(buyRent);
  const t = useTranslations('leadDetailsPage');

  return (
    <>
      {isValidBuyRent && (
        <>
          <Typography variant="h4" color="text.secondary">
            {t('budget')}
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={4}>
              <LeadDetailsInfoBlock label={t('buyRent')} info={toTitleCase(buyRent)} />
            </Grid>
            <LeadBuyRentInfo
              infoKeys={QobrixPriceKeysBuyRent[buyRent as ValueOf<typeof QobrixLeadBuyRent>]}
              lead={lead}
            />
            {lead.description && (
              <Grid item xs={12}>
                <LeadDetailsInfoBlock
                  label={t('description')}
                  info={lead.description}
                  display="block"
                />
              </Grid>
            )}
          </Grid>
        </>
      )}
    </>
  );
};

export { LeadDetailsBudgetSection };
