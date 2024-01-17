'use client';

import { Box, Typography } from '@mui/material';
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
          <Box>
            <Typography>{t('notificationCenter')}</Typography>
            <Box
              sx={{
                p: 1,
                marginTop: '5px',
                borderBottom: '1px solid grey',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Typography>{t('noNewNotifications')}</Typography>
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
          </Box>
        ))}
    </>
  );
};

export { NotificationCenter };
