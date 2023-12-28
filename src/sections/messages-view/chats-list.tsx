import { useState, useCallback } from 'react';
import { Box, Stack, TextField, InputAdornment } from '@mui/material';
import { IChatItem } from 'types/chat';
import Iconify from 'components/iconify';
import SearchNotFound from 'components/search-not-found';
import AddGroupChatButton from './add-group-chat-button';
import ChatItem from './chat-item';
import SortComponent, { sortChats } from './sort-component';
import { Values, getSortOptions } from './drop-box-data';

type Props = {
  chats: IChatItem[];
  t: Function;
};

export default function ChatsList({ chats, t }: Props) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortBy, setSortBy] = useState<Values>(getSortOptions(t)[0]);

  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  }, []);

  const filteredChats = chats.filter(
    (chat) =>
      chat.chatName?.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
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
      <Stack
        sx={{
          mb: 2,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <TextField
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder={t('searchPlaceholder')}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
          sx={{ flex: 1, mr: 2 }}
        />

        <AddGroupChatButton t={t} />
      </Stack>

      <SortComponent t={t} sort={sortBy} onSort={handleSortBy} sortOptions={getSortOptions(t)} />

      {sortedChats.length ? (
        sortedChats.map((chat) => <ChatItem key={chat.id} chat={chat} />)
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