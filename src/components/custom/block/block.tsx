import { Stack, StackProps, Typography } from '@mui/material';

export interface BlockProps extends StackProps {
  label?: string;
  children: React.ReactNode;
}

export function Block({ label = '', sx, children }: BlockProps) {
  return (
    <Stack spacing="2px" sx={{ width: 1, ...sx }}>
      <Typography>{label}</Typography>
      {children}
    </Stack>
  );
}
