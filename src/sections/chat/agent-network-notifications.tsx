import { useTranslations } from 'next-intl';
import { Box, Card, Divider, Typography } from '@mui/material';
import { CustomLink } from 'components/custom';
import Iconify from 'components/iconify';
import { AppRoute } from 'enums';
import { GREY } from 'theme/palette';

const ChatNotifications = (): JSX.Element => {
  const t = useTranslations('agents');

  return (
    <Box>
      <Divider sx={{ color: 'inherit' }} />
      <Typography variant="h4" sx={{ my: 1.5, color: GREY[800] }}>
        {t('chatSectionTitle')}
      </Typography>
      <Box
        sx={{
          py: 1,
          marginTop: '5px',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Typography color={GREY[800]}>{t('noNotifications')}</Typography>
        <CustomLink href={AppRoute.CHATS_PAGE}>
          <Box component="span" display="flex" alignItems="center" color={GREY[800]}>
            {t('view')}
            <Iconify icon="mingcute:right-line" width="15px" height="15px" color="inherit" />
          </Box>
        </CustomLink>
      </Box>
      <Divider sx={{ color: 'inherit' }} />
    </Box>
  );
};

export { ChatNotifications };
