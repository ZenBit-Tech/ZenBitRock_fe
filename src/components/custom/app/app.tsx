'use client';

import { LoadingScreen } from 'components/loading-screen';
import { StorageKey } from 'enums';
import { useEffect, useSelector, useState } from 'hooks';
import { RootState } from 'store';
import { useGetProfileQuery } from 'store/auth';
import { Header } from '../header/header';
import { Navbar } from '../navbar/navbar';

type Props = {
  children: React.ReactNode;
};

const App = ({ children }: Props) => {
  const user = useSelector((state: RootState) => state.authSlice.user);
  const [token, setToken] = useState<string | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    setToken(localStorage.getItem(StorageKey.TOKEN));
    setAuthChecked(true);
  }, []);

  const shouldFetchProfile = !user && token;
  const { isLoading } = useGetProfileQuery(undefined, { skip: !shouldFetchProfile });

  if (!authChecked) {
    return <LoadingScreen />;
  }

  return (
    <>
      {!isLoading && (
        <>
          <Header user={user} />
          {children}
          <Navbar user={user} />
        </>
      )}
    </>
  );
};

export { App };
