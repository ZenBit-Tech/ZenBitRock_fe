'use client';

import { Box, Typography } from '@mui/material';
import Iconify from 'components/iconify';
import { colors } from 'constants/colors';
import { AppRoute } from 'enums';
import { useRouter, useTranslations } from 'hooks';
import { useGetUnreadMessagesQuery } from 'store/message';

interface MessagesIndicatorProps {
  dimensions: {
    width: string;
    height: string;
  };
  destination: {
    type?: string; //user or room
    idFrom?: string;
    id: string;
  };
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
}

const MessagesIndicator = ({
  dimensions,
  destination,
  position,
}: MessagesIndicatorProps): JSX.Element => {
  const t = useTranslations('MessagesPage');
  const { data: quantity } = useGetUnreadMessagesQuery(
    {
      id: destination.id,
      type: destination.idFrom && destination.idFrom,
      typeId: destination.type && destination.type,
    },
    { refetchOnMountOrArgChange: true }
  );

  const router = useRouter();

  return (
    <Box
      sx={{
        width: 'fit-content',
        height: 'fit-content',
        p: '0',
        position: 'absolute',
        top: position.top,
        bottom: position.bottom,
        left: position.left,
        right: position.right,
        zIndex: '10',
        cursor: 'pointer',
        pointerEvents: destination.type ? 'none' : 'auto',
      }}
    >
      <Iconify
        title={`You have ${quantity} ${t('unread')}`}
        color={colors.BUTTON_PRIMARY_COLOR}
        icon={'fa6-regular:message'}
        width={dimensions.width}
        height={dimensions.height}
        sx={{
          transition: 'all 200ms ease-out',
          '&:hover': {
            color: colors.BUTTON_SECOND_COLOR,
            transition: 'all 200ms ease-out',
          },
        }}
        onClick={() => router.push(AppRoute.MESSAGES_PAGE)}
      />
      <Typography
        color={colors.BUTTON_PRIMARY_COLOR}
        sx={{
          fontSize: `${Number(dimensions.height.split('rem')[0]) * 0.8}rem`,
          position: 'absolute',
          top: '50%',
          left: '50%',
          zIndex: '11',
          transform: 'translate(-50%)',
        }}
      >
        {quantity > 99 ? '99+' : quantity}
      </Typography>
    </Box>
  );
};

export default MessagesIndicator;
