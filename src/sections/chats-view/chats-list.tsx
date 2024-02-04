import { Box, Fab, Stack, TextField, Typography } from '@mui/material';
import { useScrollToTop, useState, useCallback, useSelector } from 'hooks';
import { NoDataFound, chatsMockData, useOnboardingContext } from 'components/custom';
import { Page500 } from 'sections/error';
import { LoadingScreen } from 'components/loading-screen';
import { useGetChatsQuery } from 'store/chat/chat-api';
import { getStorageKeyWithUserId } from 'services';
import { StorageKey } from 'enums';
import { RootState } from 'store';
import { getStorage, setStorage } from 'hooks/use-local-storage';
import { Chat } from 'types';
import ChatItem from './chat-item';
import { Values, getSortOptions } from './helpers/drop-box-data';
import { SortComponent } from './sort-component';
import { sortChats } from './helpers';

type Props = {
  t: Function;
};

export default function ChatsList({ t }: Props) {
  const [sortBy, setSortBy] = useState<Values>(getSortOptions(t)[0]);
  const authUser = useSelector((state: RootState) => state.authSlice.user);
  const userId = authUser?.id || '';

  const searchParamWithUserId: string = getStorageKeyWithUserId(
    StorageKey.CHATS_SEARCH_PARAM,
    userId
  );

  const [searchParam, setSearchParam] = useState<string>(getStorage(searchParamWithUserId) || '');

  const {
    state: { tourActive },
  } = useOnboardingContext();

  const { data, isLoading, isError } = useGetChatsQuery();

  const isVisible = useScrollToTop();

  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const data = event.target.value;

    setSearchParam(data);
    setStorage(searchParamWithUserId, data);
  }, []);

  const scrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSortBy = useCallback((newValue: Values) => {
    setSortBy(newValue);
  }, []);

  const chatsData: Chat[] | [] = data || [];

  const searchParamsArray =
    searchParam.trim() !== '' ? searchParam.trim().toLowerCase().split(/\s+/) : [];

  let filteredChats;

  if (searchParamsArray.length) {
    filteredChats = chatsData.filter(
      (chat) =>
        chat.title?.toLowerCase().includes(searchParam.toLowerCase()) ||
        chat.members.some(
          (member) =>
            !member.isDeleted &&
            searchParamsArray.every(
              (searchWord) =>
                member.firstName.toLowerCase().includes(searchWord) ||
                member.lastName.toLowerCase().includes(searchWord)
            )
        )
    );
  } else if (!searchParam) {
    filteredChats = data;
  } else {
    filteredChats = [];
  }

  const sortedChats: Chat[] | [] = sortChats(filteredChats || [], sortBy.value);

  const chats: Chat[] | [] = tourActive ? chatsMockData.data : sortedChats || [];

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    return <Page500 />;
  }

  return (
    <Box display="flex" flexDirection="column">
      <TextField
        value={searchParam}
        onChange={handleSearchChange}
        placeholder={t('searchPlaceholder')}
      />

      <SortComponent t={t} sort={sortBy} onSort={handleSortBy} sortOptions={getSortOptions(t)} />

      {searchParamsArray.length && chats.length ? (
        <Typography textAlign="center" variant="h6" sx={{ my: 1 }}>
          {`${t('results')} ${searchParam}:`}
        </Typography>
      ) : null}

      {chats.length ? (
        <Stack pb="45px">
          {chats.map((chat, idx) => {
            if (chat.messages.length || !chat.isPrivate) {
              return (
                <ChatItem
                  key={chat.id}
                  chat={chat}
                  className={idx === 0 ? 'onboarding-step-14' : ''}
                />
              );
            }

            return null;
          })}

          <Fab
            color="primary"
            aria-label="scroll to top"
            onClick={scrollToTop}
            sx={{
              position: 'fixed',
              bottom: '70px',
              right: '20px',
              display: isVisible ? 'block' : 'none',
              transition: 'easy-in 200 display',
            }}
          >
            ↑
          </Fab>
        </Stack>
      ) : (
        <NoDataFound />
      )}
    </Box>
  );
}
