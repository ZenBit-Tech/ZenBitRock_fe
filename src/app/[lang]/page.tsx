'use client';

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { Box } from '@mui/material';
import { Button, Link } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Locale } from 'locales/i18n.config';
import { getDictionary } from 'lib/dictionary';
import { colors } from 'constants/colors';
import { pageLinks } from 'constants/pageLinks';
import { typography } from 'theme/typography';
import PagesContainer from 'components/PagesContainer/PagesContainer';
import { LoadingScreen } from 'components/loading-screen';

type Props = {
  params: { lang: Locale };
};

type HomePageType = {
  Header: {
    [key: string]: string;
  };
  Page: {
    [key: string]: string;
  };
};

export default function HomePage({ params: { lang } }: Props) {
  const [data, setData] = useState<HomePageType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { Home } = await getDictionary(lang);
        setData(Home);
      } catch (error) {
        notFound();
      }
    };

    fetchData();
  }, [lang]);

  if (!data) {
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
            <Link underline={'none'} color={colors.TEST_MAIN_COLOR} href={pageLinks.SIGN_IN_PAGE}>
              {data.Page.signInLink}
            </Link>
          </Button>
          <Button variant="contained" size="large">
            <Link underline={'none'} color={colors.TEST_MAIN_COLOR} href={pageLinks.SIGN_UP_PAGE}>
              {data.Page.signUpLink}
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
          {data.Page.title}
        </Typography>
        <Button variant="contained" fullWidth size="large">
          <Link underline={'none'} color={colors.TEST_MAIN_COLOR} href={pageLinks.SIGN_IN_PAGE}>
            {data.Page.buttonTxt}
          </Link>
        </Button>
      </Box>
    </PagesContainer>
  );
}
