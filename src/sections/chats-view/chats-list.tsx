import { useState, useCallback } from 'react';
import { Box, Fab, Stack, TextField, Typography } from '@mui/material';
import { useScrollToTop } from 'hooks';
import SearchNotFound from 'components/search-not-found';
import { Chat } from 'types';
import ChatItem from './chat-item';
import { Values, getSortOptions } from './helpers/drop-box-data';
import { sortChats } from './helpers';
import { SortComponent } from './sort-component';

type Props = {
  chats: Chat[];
  t: Function;
};

export default function ChatsList({ chats, t }: Props) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortBy, setSortBy] = useState<Values>(getSortOptions(t)[0]);

  const isVisible = useScrollToTop();

  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  }, []);

  const scrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredChats = chats.filter(
    (chat) =>
      chat.title?.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
      chat.members.some(
        (member) =>
          member.firstName.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
          member.lastName.toLowerCase().startsWith(searchTerm.toLowerCase())
      )
  );

  const sortedChats = sortChats(filteredChats, sortBy.value);

  const handleSortBy = useCallback((newValue: Values) => {
    setSortBy(newValue);
  }, []);

  return (
    <Box display="flex" flexDirection="column">
      <TextField
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder={t('searchPlaceholder')}
      />

      <SortComponent t={t} sort={sortBy} onSort={handleSortBy} sortOptions={getSortOptions(t)} />

      {searchTerm && sortedChats.length ? (
        <Typography textAlign="center" variant="h6" sx={{ my: 1 }}>
          {`${t('results')} ${searchTerm}:`}
        </Typography>
      ) : null}

      {sortedChats.length ? (
        <Stack>
          {sortedChats.map((chat) => (
            <ChatItem key={chat.id} chat={chat} />
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
        <SearchNotFound
          query={searchTerm}
          sx={{
            p: 3,
            mx: 'auto',
            width: '100%',
            bgcolor: 'background.neutral',
          }}
        />
      )}
    </Box>
  );
}