import { Box } from '@mui/material';
import { Container } from '@mui/system';
import CheckInIllustration from 'assets/illustrations/check-in-illustration';

type Props = {
  children: React.ReactNode;
};
function PagesContainer({ children }: Props) {
  return (
    <Container maxWidth="xl" sx={{ display: 'flex', paddingTop: '24px' }}>
      <Box
        sx={{
          flex: '1',
        }}
      >
        <CheckInIllustration maxWidth="80%" />
      </Box>
      {children}
    </Container>
  );
}

export default PagesContainer;
