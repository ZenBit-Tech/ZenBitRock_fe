'use client';

import { ReactNode, FC } from 'react';
import { useTranslations } from 'next-intl';
import { Button, Link } from '@mui/material';
import Typography from '@mui/material/Typography';
import { colors } from 'constants/colors';
import { links } from 'constants/links';
import { typography } from 'theme/typography';
import WelcomePageContainer from 'components/WelcomePageContainer/WelcomePageContainer';
import { RightSection, StyledBtnWrapper } from 'components/WelcomePageContainer/styles';

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
    <WelcomePageContainer>
      <RightSection maxWidth="sm">
        <StyledBtnWrapper>
          <Button variant="contained" sx={{ marginRight: '10px' }} size="large">
            <CustomLink href={links.SIGN_IN_PAGE}>{t('Page.signInLink')}</CustomLink>
          </Button>
          <Button variant="contained" size="large">
            <CustomLink href={links.SIGN_UP_PAGE}>{t('Page.signUpLink')}</CustomLink>
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
          <CustomLink color="primary" href={links.SIGN_IN_PAGE}>
            {t('Page.buttonTxt')}
          </CustomLink>
        </Button>
      </RightSection>
    </WelcomePageContainer>
  );
}
