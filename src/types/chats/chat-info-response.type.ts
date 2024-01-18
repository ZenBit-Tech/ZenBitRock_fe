import { UserChatResponse } from 'types/user-backend';

type ChatInfoResponse = {
  id: string;
  isPrivate: boolean;
  owner?: { id: string; firstName: string; lastName: string };
  members: UserChatResponse[];
  title?: string;
  createdAt?: string;
  updatedAt?: string;
};

export { type ChatInfoResponse };
