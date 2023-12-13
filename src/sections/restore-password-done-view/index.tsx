'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import SeoIllustration from 'assets/illustrations/seo-illustration';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { AppRoute } from 'enums';
import { Wrapper, LeftSection, RightSection, FormWrapper } from './styles';

export default function RestorePasswordDoneView(): JSX.Element {
  const t = useTranslations('RestorePasswordDonePage');
  const router = useRouter();

  const handleClick = () => {
    router.push(AppRoute.SIGN_IN_PAGE);
  };

  return (
    <Wrapper>
      <LeftSection>
        <SeoIllustration />
      </LeftSection>
      <RightSection>
        <FormWrapper>
          <Box
            gap={3}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            sx={{ px: '40px' }}
          >
            <Stack spacing={2} direction="row" alignItems="center">
              <Button onClick={() => router.back()}>
                <KeyboardArrowLeftIcon sx={{ fontSize: '48px', color: 'black' }} />
              </Button>
              <Typography align="center" variant="h3">
                {t('title')}
              </Typography>
            </Stack>

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
          </Box>
        </FormWrapper>
      </RightSection>
    </Wrapper>
  );
}
