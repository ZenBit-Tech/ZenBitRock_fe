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
    type?: string;
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

const MAX_TO_SHOW: string = '99+';
const MAX_TO_COMPARE: number = 99;

const MessagesIndicator = ({
  dimensions,
  destination,
  position,
}: MessagesIndicatorProps): JSX.Element | null => {
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

  return quantity?.data && quantity?.data > 0 ? (
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
        title={`You have ${quantity?.data} ${t('unread')}`}
        color={colors.BUTTON_SECOND_COLOR}
        icon="bxs:message-square"
        width={dimensions.width}
        height={dimensions.height}
        sx={{
          transition: 'all 200ms ease-out',
          '&:hover': {
            color: colors.TEST_MAIN_COLOR,
            transition: 'all 200ms ease-out',
          },
        }}
        onClick={() => router.push(AppRoute.MESSAGES_PAGE)}
      />
      <Typography
        color={colors.PRIMARY_LIGHT_COLOR}
        sx={{
          fontSize: `${Number(dimensions.height.split('rem')[0]) * 0.4}rem`,
          position: 'absolute',
          top: '15%',
          left: '50%',
          zIndex: '11',
          transform: 'translateX(-50%)',
          pointerEvents: 'none',
        }}
      >
        {quantity?.data && quantity?.data > MAX_TO_COMPARE ? MAX_TO_SHOW : quantity?.data}
      </Typography>
    </Box>
  ) : null;
};

export default MessagesIndicator;
