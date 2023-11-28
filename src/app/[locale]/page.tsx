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
            <Button variant="contained" sx={{ marginRight: '10px' }} size="large">
              <CustomLink href={AppRoute.SIGN_IN_PAGE}>{t('Page.signInLink')}</CustomLink>
            </Button>
            <Button variant="contained" size="large">
              <CustomLink href={AppRoute.SIGN_UP_PAGE}>{t('Page.signUpLink')}</CustomLink>
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
          <Button variant="contained" fullWidth size="large">
            <CustomLink color="primary" href={AppRoute.SIGN_IN_PAGE}>
              {t('Page.buttonTxt')}
            </CustomLink>
          </Button>
        </RightSection>
      </WelcomePageContainer>
    </PublicRoute>
  );
}
