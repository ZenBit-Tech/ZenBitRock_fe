import { Box, Fab, Stack, TextField, Typography } from '@mui/material';
import { useScrollToTop, useState, useCallback, useInfinityScroll } from 'hooks';
import { NoDataFound, chatsMockData, useOnboardingContext } from 'components/custom';
import { Page500 } from 'sections/error';
import { LoadingScreen } from 'components/loading-screen';
import { useGetChatsQuery } from 'store/chat/chat-api';
import ChatItem from './chat-item';
import { Values, getSortOptions } from './helpers/drop-box-data';
import { SortComponent } from './sort-component';
import { sortChats } from './helpers';

type Props = {
  t: Function;
};

const FIRST_PAGE: number = 1;

export default function ChatsList({ t }: Props) {
  const [page, setPage] = useState<number>(FIRST_PAGE);
  const [searchParam, setSearchParam] = useState<string>('');
  const [sortBy, setSortBy] = useState<Values>(getSortOptions(t)[0]);

  const {
    state: { tourActive },
  } = useOnboardingContext();

  const { data, isLoading, isError, isFetching } = useGetChatsQuery({
    page,
    limit: 100,
    sortType: sortBy.value,
    searchParam,
  });

  const isVisible = useScrollToTop();

  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParam(event.target.value);
  }, []);

  const scrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSortBy = useCallback((newValue: Values) => {
    setSortBy(newValue);
  }, []);

  const chatsData = data || [];

  const filteredChats = chatsData.filter(
    (chat) =>
      chat.title?.toLowerCase().startsWith(searchParam.toLowerCase()) ||
      chat.members.some(
        (member) =>
          member.firstName.toLowerCase().startsWith(searchParam.toLowerCase()) ||
          member.lastName.toLowerCase().startsWith(searchParam.toLowerCase())
      )
  );

  const sortedChats = sortChats(filteredChats || [], sortBy.value);

  const chats = tourActive ? chatsMockData.data : sortedChats || [];

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

      {searchParam && chats.length ? (
        <Typography textAlign="center" variant="h6" sx={{ my: 1 }}>
          {`${t('results')} ${searchParam}:`}
        </Typography>
      ) : null}

      {chats.length ? (
        <Stack>
          {chats.map((chat, idx) => (
            <ChatItem key={chat.id} chat={chat} className={idx === 0 ? 'onboarding-step-14' : ''} />
          ))}

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
