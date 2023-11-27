'use client';

import { LoadingScreen } from 'components/loading-screen';
import { AppRoute } from 'enums';
import { useEffect, useRouter, useSelector, useState } from 'hooks';
import { RootState } from 'store';

type Properties = {
  children: React.ReactNode;
  redirectPath?: keyof typeof AppRoute;
};

const ProtectedRoute: React.FC<Properties> = ({
  children,
  redirectPath = AppRoute.SIGN_IN_PAGE,
}) => {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.authSlice.id);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const hasUser = Boolean(user);

    if (!hasUser) {
      router.replace(redirectPath);
    }

    setAuthChecked(true);
  }, [user]);

  const isRenderingOnServer = !authChecked && !user;

  if (isRenderingOnServer) {
    return <LoadingScreen />;
  }

  return <>{authChecked && user && children}</>;
};

export { ProtectedRoute };
