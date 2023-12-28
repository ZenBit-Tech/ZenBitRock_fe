'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { AppRoute } from 'enums';
import { typography } from 'theme/typography';
import WelcomePageContainer from 'components/WelcomePageContainer/WelcomePageContainer';
import { RightSection, StyledBtnWrapper } from 'components/WelcomePageContainer/styles';
import { CustomLink, PublicRoute } from 'components/custom';

export default function HomePage() {
  const t = useTranslations('Home');

  return (
    <PublicRoute>
      <WelcomePageContainer>
        <RightSection maxWidth="sm">
          <StyledBtnWrapper>
            <Button variant="contained" sx={{ marginRight: '10px', padding: '14px' }} size="large">
              <CustomLink href={AppRoute.SIGN_IN_PAGE} color="primary">
                {t('Page.signInLink')}
              </CustomLink>
            </Button>
            <Button variant="contained" size="large" sx={{ padding: '14px' }}>
              <CustomLink href={AppRoute.SIGN_UP_PAGE} color="primary">
                {t('Page.signUpLink')}
              </CustomLink>
            </Button>
          </StyledBtnWrapper>
          <Typography
            variant="h1"
            align="center"
            gutterBottom
            sx={{
              ...typography.h3,
              mx: 'auto',
            }}
            maxWidth="500px"
          >
            {t('Page.title')}
          </Typography>
          <CustomLink color="primary" href={AppRoute.SIGN_UP_PAGE}>
            <Button
              variant="contained"
              fullWidth
              size="large"
              sx={{
                padding: '14px',
                color: 'primary.main',
                '&:hover': {
                  color: 'primary.main',
                },
              }}
            >
              {t('Page.buttonTxt')}
            </Button>
          </CustomLink>
        </RightSection>
      </WelcomePageContainer>
    </PublicRoute>
  );
}
