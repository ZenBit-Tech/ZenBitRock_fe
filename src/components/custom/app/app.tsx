'use client';

import { StorageKey } from 'enums';
import { useEffect, useSelector, useState } from 'hooks';
import { RootState } from 'store';
import { LoadingScreen } from 'components/loading-screen';
import { useGetProfileQuery } from 'store/auth';

type Props = {
  children: React.ReactNode;
};

const App = ({ children }: Props) => {
  const userId = useSelector((state: RootState) => state.authSlice.id);
  const [token, setToken] = useState<string | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    setToken(localStorage.getItem(StorageKey.TOKEN));
    setAuthChecked(true);
  }, []);

  const shouldFetchProfile = !userId && token;
  const { isLoading } = useGetProfileQuery(undefined, { skip: !shouldFetchProfile });

  if (!authChecked) {
    return <LoadingScreen />;
  }

  return <>{!isLoading && children}</>;
};

export { App };
