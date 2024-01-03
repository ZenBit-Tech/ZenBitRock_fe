'use client';

import { Box, Typography } from '@mui/material';
import { CustomLink } from 'components/custom';
import Iconify from 'components/iconify';
import { useState } from 'hooks';

const NotificationCenter = ({ t }: { t: Function }): JSX.Element => {
  const [isVisible] = useState<boolean>(false);

  return (
    <>
      {isVisible && (
        <Box>
          <Typography>{t('Notification center')}</Typography>
          <Box
            sx={{
              p: 1,
              marginTop: '5px',
              borderBottom: '1px solid grey',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Typography>{t('No new notifications')}</Typography>
            <CustomLink href="#">
              <Box component="span" display="flex" alignItems="center">
                {t('View')}
                <Iconify icon="mingcute:right-line" width="15px" height="15x" color="black" />
              </Box>
            </CustomLink>
          </Box>
        </Box>
      )}
    </>
  );
};

export { NotificationCenter };
