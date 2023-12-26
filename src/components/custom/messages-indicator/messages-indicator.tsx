'use client';

import { useEffect, useInfinityScroll, useScrollToTop, useState, useTranslations } from 'hooks';
import Iconify from 'components/iconify';
import { colors } from 'constants/colors';

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

const MessagesIndicator = ({
  dimensions,
  destination,
  position,
}: MessagesIndicatorProps): JSX.Element => {
  const t = useTranslations('MessagesPage');
  const { quantity } = useGetUnreadMessagesQuery(
    { destination.id, destination.idFrom && destination.idFrom, destination.type && destination.type },
    { refetchOnMountOrArgChange: true }
  );

  return (
    <Iconify
      title={`You have ${quantity} ${t('unread')}`}
      color={colors.BUTTON_PRIMARY_COLOR}
      icon={'fa6-regular:message'}
      width={dimensions.width}
      height={dimensions.height}
      sx={{
        position: 'absolute',
        top: position.top,
        bottom: position.bottom,
        left: position.left,
        right: position.right,
        zIndex: '100',
        cursor: 'pointer',
        transition: 'all 200ms ease-out',
        '&:hover': {
          color: colors.BUTTON_SECOND_COLOR,
          transition: 'all 200ms ease-out',
        },
      }}
    />
  );
};

export default MessagesIndicator;
