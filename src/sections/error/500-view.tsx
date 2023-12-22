'use client';

import { useTranslations } from 'next-intl';
import { m } from 'framer-motion';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { SeverErrorIllustration } from 'assets/illustrations';
import { RouterLink } from 'routes/components';
import { MotionContainer, varBounce } from 'components/animate';
import CompactLayout from 'sections/compact/layout';
import { AppRoute } from 'enums';

export default function Page500(): JSX.Element {
  const t = useTranslations('page500');

  return (
    <CompactLayout>
      <MotionContainer>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            {t('pageTitle')}
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: 'text.secondary' }}>{t('pageMsg')}</Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <SeverErrorIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} />
        </m.div>

        <Button
          component={RouterLink}
          href={AppRoute.HOME_PAGE}
          size="large"
          variant="contained"
          color="primary"
          sx={{ p: '14px' }}
        >
          {t('btnTxt')}
        </Button>
      </MotionContainer>
    </CompactLayout>
  );
}
