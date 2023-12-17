import { Box, Typography } from '@mui/material';

type Props = {
  label: string;
  info: string;
  display?: 'flex' | 'block';
};
const LeadDetailsInfoBlock = ({ label, info, display = 'flex' }: Props): JSX.Element => (
  <Box sx={{ display: { xs: display, sm: 'block' }, alignItems: 'center', gap: 1 }}>
    <Typography variant="caption">{`${label} :`}</Typography>
    <Typography sx={{ wordWrap: 'break-word' }} variant="subtitle2">
      {info}
    </Typography>
  </Box>
);

export { LeadDetailsInfoBlock };
