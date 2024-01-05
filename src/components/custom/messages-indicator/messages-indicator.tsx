'use client';

import { Badge, Box, IconButton } from '@mui/material';
import { AppRoute } from 'enums';
import { useRouter, useTranslations } from 'hooks';
import { useMemo } from 'react';
import MailIcon from '@mui/icons-material/Mail';
import { useGetUnreadMessagesQuery } from 'store/message';

interface MessagesIndicatorProps {
  destination: {
    id: string;
  };
}

const MessagesIndicator = ({ destination }: MessagesIndicatorProps): JSX.Element | null => {
  const { data: quantity } = useGetUnreadMessagesQuery(
    {
      id: destination.id,
    },
    { refetchOnMountOrArgChange: true }
  );

  const router = useRouter();

  const t = useTranslations('agents');

  const ariaLabel = useMemo((): string => {
    if (quantity && quantity.data === 0) {
      return t('noNotificationsLabel');
    }
    if (quantity && quantity.data > 99) {
      return t('more99');
    }

    return `${quantity && quantity.data} ${t('notifications')}`;
  }, [quantity, t]);

  return (
    <Box
      sx={{
        width: 'fit-content',
        height: 'fit-content',
        p: '0',
        cursor: 'pointer',
      }}
      onClick={() => router.push(AppRoute.MESSAGES_PAGE)}
    >
      <IconButton aria-label={ariaLabel} sx={{ height: '50px', width: '50px' }}>
        <Badge badgeContent={quantity && quantity.data} color="primary">
          <MailIcon
            sx={{
              height: '40px',
              width: '40px',
            }}
          />
        </Badge>
      </IconButton>
    </Box>
  );
};

export default MessagesIndicator;
