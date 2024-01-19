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

export { type Chat };
