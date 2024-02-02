import { ChatMember } from 'types/user-data';
import { Message } from './message';

type Chat = {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  isPrivate: boolean;
  messages: Message[];
  members: ChatMember[];
};

type Pagination = {
  page_count: number;
  current_page: number;
  has_next_page: boolean;
  has_prev_page: boolean;
  count: number;
  limit: number;
};

type Chats = {
  data: Chat[];
  pagination: Pagination;
};

type ChatsRequest = { page: number; limit: number; sortType: string; searchParam: string };

export { type Chat, type Chats, type ChatsRequest, type Pagination };
