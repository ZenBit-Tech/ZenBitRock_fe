type UserProfileResponse = {
  email: string;
  contactEmail: string;
  id: string;
  isVerified: boolean;
  isNewbie: boolean;
  firstName: string | null;
  lastName: string | null;
  role: string;
  city: string;
  phone: string;
  qobrixContactId: string;
  qobrixAgentId: string;
  qobrixUserId: string;
  agencyName: string;
  description: string;
  country: string;
  avatarUrl: string;
  avatarPublicId: string;
  isDeleted: boolean;
  receiveNotifications: boolean;
};

export { type UserProfileResponse };
