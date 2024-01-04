export type CreateRoomRequest = {
  title: string;
};

export type CreateRoomResponse = {
  room: {
    id: string;
    title: string;
    owner: {
      id: string;
    };
    createdAt: string;
    updatedAt: string;
  };
};

export type CreateMessageRequest = {
  content: string;
  roomId: string;
};

export type CreateMessageResponse = {
  id: string;
  content: string;
  createdAt: string;
  roomId: string;
  owner: {
    id: string;
  };
};

export type getMessagesRequest = {
  roomId: string;
};

export type getMessageResponse = {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  isRead: boolean;
};

export type GetMessagesResponse = {
  title: string;
  owner: {
    id: string;
  };
  id: string;
  createdAt: string;
  updatedAt: string;
};

export type IChatItem = {
  id: string;
  type: string;
  chatName: string;
  members: {
    firstName: string;
    lastName: string;
    avatarUrl: string;
  }[];
  lastMessage: string;
  lastMessageDate: string;
  countOfUnreadMessages: number;
};

export type IChatAttachment = {
  name: string;
  size: number;
  type: string;
  path: string;
  preview: string;
  createdAt: Date;
  modifiedAt: Date;
};

export type IChatMessage = {
  id: string;
  body: string;
  createdAt: string;
  isMe: boolean;
  sender: {
    name: string;
  } | null;
  isRead: boolean;
};

export type IChatParticipant = {
  id: string;
  name: string;
  role: string;
  email: string;
  address: string;
  avatarUrl: string;
  phoneNumber: string;
  lastActivity: Date;
  status: 'online' | 'offline' | 'alway' | 'busy';
};

export type IChatConversation = {
  id: string;
  type: string;
  unreadCount: number;
  messages: IChatMessage[];
  participants: IChatParticipant[];
};

export type IChatConversations = {
  byId: Record<string, IChatConversation>;
  allIds: string[];
};
