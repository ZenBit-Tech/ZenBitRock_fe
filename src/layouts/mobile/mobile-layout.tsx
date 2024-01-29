import { Box } from '@mui/material';

type Props = {
  children: React.ReactNode;
};
function MobileLayout({ children }: Props) {
  return <Box sx={{ maxWidth: 800, margin: '0 auto', pb: 8 }}>{children}</Box>;
}

export { MobileLayout };
