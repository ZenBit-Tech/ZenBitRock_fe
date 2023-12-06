'use client';

import { LoadingScreen } from 'components/loading-screen';
import { AppRoute } from 'enums';
import { useEffect, useRouter, useState, useVerification } from 'hooks';
import { ValueOf } from 'types';

type Properties = {
  children: React.ReactNode;
  defaultRedirectPath?: ValueOf<typeof AppRoute>;
};

const PublicRoute: React.FC<Properties> = ({
  children,
  defaultRedirectPath = AppRoute.MAIN_PAGE,
}) => {
  const router = useRouter();
  const { user, redirectPath } = useVerification({
    defaultRedirectPath,
  });
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    if (user) {
      router.replace(redirectPath);
    }

    setAuthChecked(true);
  }, [user, redirectPath]);

  const isRenderingOnServer = !authChecked && !user;

  if (isRenderingOnServer) {
    return <LoadingScreen />;
  }

  return <>{authChecked && !user && children}</>;
};

export { PublicRoute };
