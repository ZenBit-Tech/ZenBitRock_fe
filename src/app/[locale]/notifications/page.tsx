'use client';

import { useSelector } from 'hooks';
import { RootState } from 'store';
import { Page500, UserNotificationsView } from 'sections';

const NotificationsPage = () => {
  const user = useSelector((state: RootState) => state.authSlice.user);

  if (!user) {
    return <Page500 />;
  }

  return <UserNotificationsView user={user} />;
};

export default NotificationsPage;
