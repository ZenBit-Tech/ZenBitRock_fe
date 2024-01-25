import { UserProfileResponse } from 'types/user-backend';

type Message = {
  content: string;
  chat: {
    id: string;
    members: { id: string }[];
  };
  owner: UserProfileResponse;
  id: string;
  createdAt: string;
  updatedAt?: string;
  isReadBy: { messageId: string; userId: string; isRead: boolean }[];
};

export { type Message };
