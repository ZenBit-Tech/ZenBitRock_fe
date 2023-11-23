'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import OrderCompleteIllustration from 'assets/illustrations/order-complete-illustration';
import { Wrapper, LeftSection, RightSection } from './styles';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { links } from 'constants/links';

export default function RestorePasswordDoneView(): JSX.Element {
  const t = useTranslations('RestorePasswordDonePage');
  const router = useRouter();

  const handleClick = () => {
    router.push(links.SIGN_IN_PAGE);
  };

  return (
    <Wrapper>
      <LeftSection>
        <OrderCompleteIllustration />
      </LeftSection>
      <RightSection>
        <Stack spacing={2} direction="row" alignItems="center">
          <Button onClick={() => router.back()}>
            <KeyboardArrowLeftIcon sx={{ fontSize: '48px', color: 'black' }} />
          </Button>
        </Stack>
        <Box
          gap={2}
          display="flex"
          flexDirection="column"
          height="calc(100vh - 80px)"
          justifyContent="center"
          paddingRight="33px"
        >
          <Stack spacing={2}>
            <Typography align="center" variant="h2">
              {t('title')}
            </Typography>

            <Stack spacing={2}>
              <Typography align="center" variant="body1" fontSize={16}>
                {t('text')}
              </Typography>

              <Button
                fullWidth
                size="large"
                color="primary"
                variant="contained"
                style={{ marginBottom: '70px' }}
                onClick={handleClick}
              >
                {t('buttonText')}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </RightSection>
    </Wrapper>
  );
}
