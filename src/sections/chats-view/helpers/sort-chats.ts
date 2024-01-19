import { Chat } from 'types';
import { Message } from 'types/chats';

const getLastMessage = (chat: Chat): string => {
  const lastMessage = chat.messages.reduce(
    (latest, message) =>
      !latest || new Date(message.createdAt) > new Date(latest.createdAt) ? message : latest,
    null as Message | null
  );

  return lastMessage ? lastMessage.createdAt : chat.createdAt;
};

export const sortChats = (chatsToSort: Chat[], sortByValue: string): Chat[] =>
  [...chatsToSort].sort((a, b) => {
    switch (sortByValue) {
      case 'oldest':
        return new Date(getLastMessage(a)).getTime() - new Date(getLastMessage(b)).getTime();

      case 'nameIncrease':
        return a.title.localeCompare(b.title);

      case 'nameDecrease':
        return b.title.localeCompare(a.title);

      default:
        return new Date(getLastMessage(b)).getTime() - new Date(getLastMessage(a)).getTime();
    }
  });
