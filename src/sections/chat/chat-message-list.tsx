import { useMemo } from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { format } from 'date-fns';
import { IChatMessage } from 'types/chat';
import { GetUserResponse } from 'types/user-data';
import { datesFormats } from 'constants/dates-formats';
import Scrollbar from 'components/scrollbar';
import { MockChatMessageItem } from 'components/custom';
import { useMessagesScroll } from './hooks';

type Props = {
  messages: IChatMessage[];
  user: GetUserResponse['data'];
};

type GroupedMessages = {
  [key: string]: IChatMessage[];
};

export default function ChatMessageList({ messages = [], user }: Props): JSX.Element {
  const { messagesEndRef } = useMessagesScroll(messages);

  const sortedMessages = useMemo(
    (): IChatMessage[] =>
      [...messages].sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      ),
    [messages]
  );

  const groupedMessages = useMemo(
    (): GroupedMessages =>
      sortedMessages.reduce((acc: GroupedMessages, message: IChatMessage) => {
        const date = new Date(message.createdAt);
        const dateString = format(date, datesFormats.chatTitleDateFormat);

        if (!acc[dateString]) {
          acc[dateString] = [];
        }
        acc[dateString].push(message);

        return acc;
      }, {}),
    [sortedMessages]
  );

  return (
    <Scrollbar ref={messagesEndRef} sx={{ px: 3, pt: 5, height: 1 }}>
      <Box>
        {Object.entries(groupedMessages).map(([date, groupMessages]) => (
          <Box key={date} sx={{ pb: 2 }}>
            <Typography variant="subtitle2" align="center" sx={{ mb: 2 }}>
              {date}
            </Typography>
            {groupMessages.map((message) => (
              <MockChatMessageItem key={message.id} message={message} participant={user} />
            ))}
          </Box>
        ))}
      </Box>
    </Scrollbar>
  );
}
