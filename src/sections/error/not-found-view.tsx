'use client';

import { m } from 'framer-motion';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CompactLayout } from 'layouts';
import { RouterLink } from 'routes/components';
import { MotionContainer, varBounce } from 'components/animate';
import { PageNotFoundIllustration } from 'assets/illustrations';
import { useTranslations } from 'hooks';

export function NotFoundView() {
  const t = useTranslations('notFoundView');

  return (
    <CompactLayout>
      <MotionContainer>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            {t('notFound')}
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: 'text.secondary' }}>{t('message')}</Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <PageNotFoundIllustration
            sx={{
              height: 260,
              my: { xs: 5, sm: 10 },
            }}
          />
        </m.div>

        <Button component={RouterLink} href="/" size="large" variant="contained" color="primary">
          {t('home')}
        </Button>
      </MotionContainer>
    </CompactLayout>
  );
}
