import { Message } from 'types/chats';

function findLatestMessage(messages: Message[]): Message | null {
  if (messages.length === 0) return null;

  const sortedMessages = [...messages].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();

    return dateB - dateA;
  });

  return sortedMessages[0];
}

function countUnreadMessages(messages: Message[]): number {
  return messages.reduce((count, message) => {
    if (!message.isRead) {
      count += 1;
    }

    return count;
  }, 0);
}

export { findLatestMessage, countUnreadMessages };
