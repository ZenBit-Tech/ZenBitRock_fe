'use client';

import { Box } from '@mui/material';
import { AppRoute } from 'enums';
import { useRouter, useTranslations } from 'hooks';
import MsgBadge from 'sections/chat/chat-msg-badge';
import { useGetUnreadMessagesQuery } from 'store/message';

interface MessagesIndicatorProps {
  destination: {
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
  destination,
  position,
}: MessagesIndicatorProps): JSX.Element | null => {
  const t = useTranslations('MessagesPage');
  const { data: quantity } = useGetUnreadMessagesQuery(
    {
      id: destination.id,
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
      }}
      onClick={() => router.push(AppRoute.MESSAGES_PAGE)}
    >
      <MsgBadge chatBadgeValue={quantity?.data ? quantity?.data : 0} />
    </Box>
  );
};

export default MessagesIndicator;
