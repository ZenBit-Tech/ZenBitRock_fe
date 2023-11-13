'use client';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { useTranslations } from 'next-intl';
import { LeftSection, RightSection, StyledFormWrapper, Wrapper } from './styles';
import { useTheme } from '@mui/material/styles';
import { Code } from './components';

const VerifyEmailPage: React.FC = () => {
  const t = useTranslations('VerifyEmail');
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Wrapper>
      {matches && <LeftSection />}
      <RightSection>
        <StyledFormWrapper theme={theme}>
          <Typography
            variant="h3"
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap="15px"
          >
            <Box component="span" fontSize="0.65em">
              {'❰'}
            </Box>
            {t('title')}
          </Typography>
          <Box component="p" color={theme.palette.text.secondary} fontSize="18px" marginTop="20px">
            {t('EmailSent')}
          </Box>

          <Code />
        </StyledFormWrapper>
      </RightSection>
    </Wrapper>
  );
};

export default VerifyEmailPage;
