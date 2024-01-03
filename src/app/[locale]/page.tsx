'use client';

import { useTranslations } from 'next-intl';
import { Button, styled } from '@mui/material';
import Typography from '@mui/material/Typography';
import { AppRoute } from 'enums';
import { typography } from 'theme/typography';
import WelcomePageContainer from 'components/WelcomePageContainer/WelcomePageContainer';
import { RightSection, StyledBtnWrapper } from 'components/WelcomePageContainer/styles';
import { CustomLink, PublicRoute } from 'components/custom';

const StyledCustomBtn = styled(Button)`
  padding: 14px;
  color: ${(props) => props.theme.palette.primary.main};
  &:hover {
    color: ${(props) => props.theme.palette.primary.main};
  }
`;

export default function HomePage() {
  const t = useTranslations('Home');

  return (
    <PublicRoute>
      <WelcomePageContainer>
        <RightSection maxWidth="sm">
          <StyledBtnWrapper>
            <CustomLink href={AppRoute.SIGN_IN_PAGE} color="primary">
              <StyledCustomBtn variant="contained" sx={{ marginRight: '10px' }} size="large">
                {t('Page.signInLink')}
              </StyledCustomBtn>
            </CustomLink>
            <CustomLink href={AppRoute.SIGN_UP_PAGE} color="primary">
              <StyledCustomBtn variant="contained" size="large">
                {t('Page.signUpLink')}
              </StyledCustomBtn>
            </CustomLink>
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
            <StyledCustomBtn variant="contained" fullWidth size="large">
              {t('Page.buttonTxt')}
            </StyledCustomBtn>
          </CustomLink>
        </RightSection>
      </WelcomePageContainer>
    </PublicRoute>
  );
}
