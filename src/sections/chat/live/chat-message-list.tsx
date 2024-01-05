import { useMemo } from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { format } from 'date-fns';
import { datesFormats } from 'constants/dates-formats';
import Scrollbar from 'components/scrollbar';
import { ChatMessageItem } from 'components/custom';

import { Message } from 'types';
import useMessagesScroll from './use-messages-scroll';

type Props = {
  messages: Message[];
};

type GroupedMessages = {
  [key: string]: Message[];
};

export default function ChatMessageList({ messages }: Props): JSX.Element {
  const { messagesEndRef } = useMessagesScroll(messages);

  const sortedMessages = useMemo(
    (): Message[] =>
      [...messages].sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      ),
    [messages]
  );

  const groupedMessages = useMemo(
    (): GroupedMessages =>
      sortedMessages.reduce((acc: GroupedMessages, message: Message) => {
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
              <ChatMessageItem message={message} key={message.id} />
            ))}
          </Box>
        ))}
      </Box>
    </Scrollbar>
  );
}
