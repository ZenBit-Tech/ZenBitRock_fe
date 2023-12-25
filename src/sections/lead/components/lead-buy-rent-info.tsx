import { Grid } from '@mui/material';
import { type QobrixLead } from 'types';
import { toTitleCase } from 'utils';
import { LeadDetailsInfoBlock } from './lead-details-info-block';

type Props = {
  infoKeys: Partial<QobrixLead>;
  lead: QobrixLead;
};

const LeadBuyRentInfo = ({ infoKeys, lead }: Props) => (
  <>
    {Object.keys(infoKeys).map((key) => {
      const value = lead[key as keyof QobrixLead];

      if (!value) return undefined;

      return (
        <Grid item xs={12} sm={4} key={key}>
          <LeadDetailsInfoBlock
            label={toTitleCase(key)}
            info={toTitleCase(value?.toString() ?? '')}
          />
        </Grid>
      );
    })}
  </>
);

export { LeadBuyRentInfo };
