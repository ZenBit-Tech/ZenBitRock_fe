'use client';

import { useTranslations } from 'next-intl';
import { m } from 'framer-motion';
import Typography from '@mui/material/Typography';
import { CompactLayout } from 'layouts';
import { MotionContainer, varBounce } from 'components/animate';
import { PageNotMatchedIllustration } from 'assets/illustrations';

export function NotMatchedView() {
  const t = useTranslations('leads');

  return (
    <CompactLayout>
      <MotionContainer>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            {t('sorry')}
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: 'text.secondary' }}>{t('try')}</Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <PageNotMatchedIllustration
            sx={{
              height: 260,
              my: { xs: 5, sm: 10 },
            }}
          />
        </m.div>
      </MotionContainer>
    </CompactLayout>
  );
}
