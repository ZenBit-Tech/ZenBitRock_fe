import { useTranslations } from 'next-intl';
import { Box, Divider, Typography } from '@mui/material';
import { CustomLink } from 'components/custom';
import Iconify from 'components/iconify';
import { AppRoute } from 'enums';
import { GREY } from 'theme/palette';

const ChatNotifications = (): JSX.Element => {
  const t = useTranslations('agents');

  return (
    <Box>
      <Typography variant="h4" sx={{ my: 3, color: GREY[600] }}>
        {t('chatSectionTitle')}
      </Typography>
      <Box
        sx={{
          p: 1,
          marginTop: '5px',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Typography>{t('noNotifications')}</Typography>
        <CustomLink href={AppRoute.MESSAGES_PAGE}>
          <Box component="span" display="flex" alignItems="center" color={GREY[600]}>
            {t('view')}
            <Iconify icon="mingcute:right-line" width="15px" height="15px" color="inherit" />
          </Box>
        </CustomLink>
      </Box>
      <Divider sx={{ mb: 2, color: GREY[600] }} />
    </Box>
  );
};

export { ChatNotifications };
