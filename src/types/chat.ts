import { UserChatResponse } from './user-backend';

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
  createdAt: string;
  updatedAt: string;
  content: string;
  isRead: boolean;
  owner: {
    id: string;
    firstName: string;
    lastName: string;
  };
};

export type IChatMockMessage = {
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

export type ICreateGroupChatRequest = {
  data: { owner: string | null; members: string[]; title: string };
};

export type ICreatePrivateChatRequest = {
  title: string;
  memberIds?: string[];
  isPrivate?: boolean;
};

export type IChatResponse = {
  chat: {
    id?: string;
    isPrivate?: boolean;
    owner?: { id: string | null };
    members?: { id: string }[] | [];
    title?: string;
    createdAt?: string;
    updatedAt?: string;
  };
};

export type IChatByIdResponse = {
  id?: string;
  isPrivate?: boolean;
  owner?: { id: string | null };
  members: UserChatResponse[];
  title?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type ICreateGroupChatResponse = { data: { id: string } };
