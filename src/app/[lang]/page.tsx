'use client';
import { Locale } from 'locales/i18n.config';
import { getDictionary } from 'lib/dictionary';
import { Box } from '@mui/material';
import { Button, Link } from '@mui/material';
import { colors } from 'constants/colors';
import Typography from '@mui/material/Typography';
import { typography } from 'theme/typography';
import PagesContainer from 'components/PagesContainer/PagesContainer';

type Props = {
  params: { lang: Locale };
};

export default async function HomePage({ params: { lang } }: Props) {
  const { Home } = await getDictionary(lang);
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
            <Link underline={'none'} color={colors.TEST_MAIN_COLOR} href="sign-in">
              {Home.Page.signInLink}
            </Link>
          </Button>
          <Button variant="contained" size="large">
            <Link underline={'none'} color={colors.TEST_MAIN_COLOR} href="sign-up">
              {Home.Page.signUpLink}
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
          {Home.Page.title}
        </Typography>
        <Button variant="contained" fullWidth size="large">
          <Link underline={'none'} color={colors.TEST_MAIN_COLOR} href="sign-in">
            {Home.Page.buttonTxt}
          </Link>
        </Button>
      </Box>
    </PagesContainer>
  );
}
