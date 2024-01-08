const ChatEvent = {
  RequestAllMessages: 'request_all_messages',
  NewMessage: 'new_message',
  RequestUnreadMessages: 'request_unread_messages',
} as const;

export { ChatEvent };
