'use client';

import { m } from 'framer-motion';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CompactLayout } from 'layouts';
import { SeverErrorIllustration } from 'assets/illustrations';
import { RouterLink } from 'routes/components';
import { MotionContainer, varBounce } from 'components/animate';
import { useTranslations } from 'hooks';

function Page500() {
  const t = useTranslations('page500');

  return (
    <CompactLayout>
      <MotionContainer>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            {t('error')}
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: 'text.secondary' }}>{t('tryAgainLater')}</Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <SeverErrorIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} />
        </m.div>

        <Button component={RouterLink} href="/" size="large" variant="contained" color="primary">
          {t('home')}
        </Button>
      </MotionContainer>
    </CompactLayout>
  );
}

export { Page500 };
