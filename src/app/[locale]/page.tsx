'use client';

import { ReactNode, FC } from 'react';
import { useTranslations } from 'next-intl';
import { Button, Link } from '@mui/material';
import Typography from '@mui/material/Typography';
import { colors } from 'constants/colors';
import { AppRoute } from 'enums';
import { typography } from 'theme/typography';
import WelcomePageContainer from 'components/WelcomePageContainer/WelcomePageContainer';
import { RightSection, StyledBtnWrapper } from 'components/WelcomePageContainer/styles';
import { PublicRoute } from 'components/custom';

interface CustomLinkProps {
  href: string;
  color?: string;
  children: ReactNode;
}

const CustomLink: FC<CustomLinkProps> = ({ href, color = colors.TEST_MAIN_COLOR, children }) => (
  <Link underline="none" color={color} href={href}>
    {children}
  </Link>
);

export default function HomePage() {
  const t = useTranslations('Home');

  return (
    <PublicRoute>
      <WelcomePageContainer>
        <RightSection maxWidth="sm">
          <StyledBtnWrapper>
            <Button variant="contained" sx={{ marginRight: '10px' }} size="large">
              <Link underline="none" color={colors.TEST_MAIN_COLOR} href={AppRoute.SIGN_IN_PAGE}>
                {t('Page.signInLink')}
              </Link>
            </Button>
            <Button variant="contained" size="large">
              <Link underline="none" color={colors.TEST_MAIN_COLOR} href={AppRoute.SIGN_UP_PAGE}>
                {t('Page.signUpLink')}
              </Link>
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
            <Link underline="none" color="primary" href={AppRoute.SIGN_IN_PAGE}>
              {t('Page.buttonTxt')}
            </Link>
          </Button>
        </RightSection>
      </WelcomePageContainer>
    </PublicRoute>
  );
}
