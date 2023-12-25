import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';

type MsgBadgeProps = {
  chatBadgeValue: number;
};

export default function MsgBadge({ chatBadgeValue }: MsgBadgeProps): JSX.Element {
  const t = useTranslations('agents');

  const ariaLabel = useMemo((): string => {
    if (chatBadgeValue === 0) {
      return t('noNotificationsLabel');
    }
    if (chatBadgeValue > 99) {
      return t('more99');
    }

    return `${chatBadgeValue} ${t('notifications')}`;
  }, [chatBadgeValue, t]);

  return (
    <IconButton aria-label={ariaLabel}>
      <Badge badgeContent={chatBadgeValue} color="primary">
        <MailIcon />
      </Badge>
    </IconButton>
  );
}
