import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import GroupRemoveIcon from '@mui/icons-material/GroupRemove';
import { NotificationType } from 'enums';

const getNotificationIcon = (notificatioinType: string): JSX.Element => {
  let icon;

  switch (notificatioinType) {
    case NotificationType.UserAddedToChat:
      icon = <GroupAddIcon color="primary" />;
      break;

    case NotificationType.UserRemovedFromChat:
      icon = <GroupRemoveIcon color="error" />;
      break;

    default:
      icon = <CircleNotificationsIcon color="primary" />;
  }
  return icon;
};

export { getNotificationIcon };
