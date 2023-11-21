'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Box } from '@mui/material';
import { Button, Link } from '@mui/material';
import Typography from '@mui/material/Typography';
import { colors } from 'constants/colors';
import { links } from 'constants/links';
import { typography } from 'theme/typography';
import PagesContainer from 'components/PagesContainer/PagesContainer';
import { LoadingScreen } from 'components/loading-screen';

type HomePageType = {
  Header: {
    [key: string]: string;
  };
  Page: {
    [key: string]: string;
  };
};

export default function HomePage() {
  const [data, setData] = useState<HomePageType | null>(null);
  const t = useTranslations('Home');

  if (data) {
    return <LoadingScreen />;
  }

  return (
    <PagesContainer>
      <Box maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', flex: '1' }}>
        <Box
          sx={{
            display: 'flex',
            alignSelf: 'flex-end',
            marginBottom: `calc(50% - 125px)`,
          }}
        >
          <Button variant="contained" sx={{ marginRight: '10px' }} size="large">
            <Link underline={'none'} color={colors.TEST_MAIN_COLOR} href={links.SIGN_IN_PAGE}>
              {t('Page.signInLink')}
            </Link>
          </Button>
          <Button variant="contained" size="large">
            <Link underline={'none'} color={colors.TEST_MAIN_COLOR} href={links.SIGN_UP_PAGE}>
              {t('Page.signUpLink')}
            </Link>
          </Button>
        </Box>
        <Typography
          variant="h1"
          align="center"
          gutterBottom
          sx={{
            ...typography.h3,
            mx: 'auto',
            mb: `calc(50% - 125px)`,
          }}
          maxWidth="500px"
        >
          {t('Page.title')}
        </Typography>
        <Button variant="contained" fullWidth size="large">
          <Link underline={'none'} color={colors.TEST_MAIN_COLOR} href={links.SIGN_IN_PAGE}>
            {t('Page.buttonTxt')}
          </Link>
        </Button>
      </Box>
    </PagesContainer>
  );
}
