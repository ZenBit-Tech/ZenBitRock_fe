type UserProfileResponse = {
  email: string;
  id: string;
  isVerified: boolean;
  firstName: string | null;
  lastName: string | null;
  role: string;
  city: string;
  phone: string;
  qobrixContactId: string;
  qobrixAgentId: string;
  agencyName: string;
  description: string;
  country: string;
  avatarUrl: string;
  qobrixAgentId: string;
};

export { type UserProfileResponse };
