import { UserProfileResponse } from 'types/user-backend';

type Message = {
  content: string;
  chat: {
    id: string;
  };
  owner: UserProfileResponse;
  id: string;
  createdAt: string;
  updatedAt: string;
  isRead: boolean;
};

export { type Message };
