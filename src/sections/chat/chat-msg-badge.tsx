import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';

type MsgBadgeProps = {
  tempValue: number;
};

export default function MsgBadge({ tempValue }: MsgBadgeProps): JSX.Element {
  const t = useTranslations('agents');

  const ariaLabel = useMemo((): string => {
    if (tempValue === 0) {
      return t('noNotificationsLabel');
    }
    if (tempValue > 99) {
      return t('more99');
    }
    
    return `${tempValue} ${t('notifications')}`;
  }, [tempValue, t]);

  return (
    <IconButton aria-label={ariaLabel}>
      <Badge badgeContent={tempValue} color="primary">
        <MailIcon />
      </Badge>
    </IconButton>
  );
}
