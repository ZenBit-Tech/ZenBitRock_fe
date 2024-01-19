import { Box, Grid, Typography } from '@mui/material';

type Props = {
  label: string;
  info: string;
  display?: 'flex' | 'block';
  grid?: boolean;
};
const LeadDetailsInfoBlock = ({ label, info, display = 'flex', grid }: Props): JSX.Element => (
  <>
    {!grid ? (
      <Box
        sx={{
          display: { xs: display, sm: 'block' },
          alignItems: 'center',
          gap: 1,
        }}
      >
        <Typography variant="body2">{`${label} :`}</Typography>
        <Typography sx={{ wordWrap: 'break-word' }} variant="body2">
          {info}
        </Typography>
      </Box>
    ) : (
      <Grid container spacing={1}>
        <Grid item xs={7}>
          <Typography variant="body2">{`${label} :`}</Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography sx={{ wordWrap: 'break-word' }} variant="body2">
            {info}
          </Typography>
        </Grid>
      </Grid>
    )}
  </>
);

export { LeadDetailsInfoBlock };
