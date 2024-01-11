const ChatEvent = {
  RequestAllMessages: 'request_all_messages',
  RequestUnreadMessages: 'request_unread_messages',
  NewMessage: 'new_message',
} as const;

export { ChatEvent };
