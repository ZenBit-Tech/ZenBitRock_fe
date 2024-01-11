const ChatEvent = {
  RequestAllMessages: 'request_all_messages',
  NewMessage: 'new_message',
  RequestAllChats: 'request_all_chats',
  RequestUnreadMessages: 'request_unread_messages',
} as const;

export { ChatEvent };
