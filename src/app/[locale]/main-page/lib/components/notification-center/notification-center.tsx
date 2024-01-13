'use client';

import { Box, Card, Typography } from '@mui/material';
import { CustomLink } from 'components/custom';
import Iconify from 'components/iconify';
import { useState } from 'hooks';

const NotificationCenter = ({ t }: { t: Function }): JSX.Element => {
  const [isVisible] = useState<boolean>(false);

  return (
    <>
      {isVisible && (
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
              <Box component="span" display="flex" alignItems="center">
                {t('view')}
                <Iconify icon="mingcute:right-line" width="15px" height="15x" color="black" />
              </Box>
            </CustomLink>
          </Box>
        </Card>
      )}
    </>
  );
};

export { NotificationCenter };
