'use client';

import { Box, Card, Typography } from '@mui/material';
import { CustomLink, useOnboardingContext } from 'components/custom';
import Iconify from 'components/iconify';
import { useState } from 'hooks';

const NotificationCenter = ({ t }: { t: Function }): JSX.Element => {
  const [isVisible] = useState<boolean>(false);
  const {
    state: { tourActive },
  } = useOnboardingContext();

  return (
    <>
      {isVisible ||
        (tourActive && (
          <Card
            sx={{
              width: '100%',
              my: '2rem',
              p: '1rem',
            }}
          >
            <Typography variant="subtitle1">{t('notificationCenter')}</Typography>
            <Box
              sx={{
                marginTop: '5px',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 'normal' }}>
                {t('noNewNotifications')}
              </Typography>
              <CustomLink href="#">
                <Box
                  component="span"
                  display="flex"
                  alignItems="center"
                  className="onboarding-step-4"
                >
                  {t('view')}
                  <Iconify icon="mingcute:right-line" width="15px" height="15x" color="black" />
                </Box>
              </CustomLink>
            </Box>
          </Card>
        ))}
    </>
  );
};

export { NotificationCenter };
