import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

type Props = {
  children: React.ReactNode;
};

export function CompactLayout({ children }: Props) {
  return (
    <Container component="main">
      <Stack
        sx={{
          py: 8,
          m: 'auto',
          maxWidth: 400,
          minHeight: 'calc(100vh - 80px)',
          textAlign: 'center',
          justifyContent: 'center',
        }}
      >
        {children}
      </Stack>
    </Container>
  );
}
