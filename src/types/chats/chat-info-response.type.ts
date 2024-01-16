import { UserChatResponse } from 'types/user-backend';

type ChatInfoResponse = {
  id: string;
  isPrivate: boolean;
  owner?: { id: string | null };
  members: UserChatResponse[];
  title?: string;
  createdAt?: string;
  updatedAt?: string;
};

export { type ChatInfoResponse };
