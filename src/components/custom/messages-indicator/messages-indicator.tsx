'use client';

import { Badge, Box, IconButton } from '@mui/material';
import { colors } from 'constants/colors';
import { AppRoute } from 'enums';
import { useRouter, useTranslations } from 'hooks';
import { useMemo } from 'react';
import MailIcon from '@mui/icons-material/Mail';
import { useGetUnreadMessagesCountQuery } from 'store/chat';

const MessagesIndicator = (): JSX.Element | null => {
  const { data: quantity } = useGetUnreadMessagesCountQuery();

  console.log(quantity);
  const router = useRouter();

  const t = useTranslations('agents');

  const ariaLabel = useMemo((): string => {
    if (quantity && quantity === 0) {
      return t('noNotificationsLabel');
    }
    if (quantity && quantity > 99) {
      return t('more99');
    }

    return `${quantity} ${t('notifications')}`;
  }, [quantity, t]);

  return (
    <Box
      sx={{
        width: 'fit-content',
        height: 'fit-content',
        p: '0',
        cursor: 'pointer',
      }}
      className="onboarding-step-11"
      onClick={() => router.push(AppRoute.CHATS_PAGE)}
    >
      <IconButton
        aria-label={ariaLabel}
        sx={{
          height: '3rem',
          width: '3rem',
          ml: '0.1rem',
          transition: 'all 200ms ease-out',
          backgroundColor: colors.BUTTON_PRIMARY_COLOR,
          '&:hover': {
            backgroundColor: colors.BUTTON_SECOND_COLOR,
            transition: 'all 200ms ease-out',
          },
        }}
      >
        <Badge badgeContent={quantity} color="primary">
          <MailIcon
            sx={{
              height: '40px',
              width: '40px',
              color: colors.PRIMARY_LIGHT_COLOR,
            }}
          />
        </Badge>
      </IconButton>
    </Box>
  );
};

export default MessagesIndicator;
