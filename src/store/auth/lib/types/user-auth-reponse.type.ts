import { UserProfileResponse } from 'types';

type UserAuthResponse = {
  user: UserProfileResponse;
  token: string;
};

export { type UserAuthResponse };
