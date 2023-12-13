'use client';

import { LoadingScreen } from 'components/loading-screen';
import { AppRoute } from 'enums';
import { useEffect, useRouter, useState, useVerification } from 'hooks';
import { usePathname } from 'next/navigation';
import { ValueOf } from 'types';

type Properties = {
  children: React.ReactNode;
  defaultRedirectPath?: ValueOf<typeof AppRoute>;
};

const ProtectedRoute: React.FC<Properties> = ({
  children,
  defaultRedirectPath = AppRoute.SIGN_IN_PAGE,
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const { user, redirectPath } = useVerification({
    defaultRedirectPath: pathname as ValueOf<typeof AppRoute>,
  });
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    if (!user) {
      router.replace(defaultRedirectPath);
    }

    if (user && pathname !== redirectPath) {
      router.replace(redirectPath);
    }
    setAuthChecked(true);
  }, [user, redirectPath, defaultRedirectPath]);

  const isRenderingOnServer = (!authChecked && !user) || (user && pathname !== redirectPath);

  if (isRenderingOnServer) {
    return <LoadingScreen />;
  }

  return <>{authChecked && user && children}</>;
};

export { ProtectedRoute };
