import { useState, useCallback } from 'react';
import { Box, TextField } from '@mui/material';
import { IChatItem } from 'types/chat';
import SearchNotFound from 'components/search-not-found';
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
      <TextField
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder={t('searchPlaceholder')}
      />

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
