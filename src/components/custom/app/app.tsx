'use client';

import { StorageKey } from 'enums';
import { useEffect, useSelector, useState } from 'hooks';
import { RootState } from 'store';
import { LoadingScreen } from 'components/loading-screen';
import { useGetProfileQuery } from 'store/auth';
import { SnackbarProvider } from 'components/snackbar';
import { Header } from '../header/header';
import { Navbar } from '../navbar/navbar';
import { SnackbarProvider } from 'components/snackbar';

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
          <SnackbarProvider>
            <Header user={user} />
            {children}
            <Navbar user={user} />
          </SnackbarProvider>
        </>
      )}
    </>
  );
};

export { App };
