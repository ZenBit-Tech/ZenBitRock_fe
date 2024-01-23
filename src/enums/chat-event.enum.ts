const ChatEvent = {
  RequestAllMessages: 'request_all_messages',
  NewMessage: 'new_message',
  RequestAllChats: 'request_all_chats',
  RequestUnreadMessages: 'request_unread_messages',
  NewChat: 'new_chat',
  ChatDeleted: 'chat_deleted',
  ChatUpdated: 'chat_updated',
  RequestUnreadMessagesCount: 'get_unread_count',
  RequestUnreadMessagesByIdCount: 'get_unread_count_by_chat_id',
  RequestMarkAsRead: 'mark_as_read',
} as const;

export { ChatEvent };
