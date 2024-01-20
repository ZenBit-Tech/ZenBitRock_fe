export type GetUserRequest = {
  id: string | null;
};

export type UpdateUserRequest = {
  data: {
    city: string;
    country: string;
    dateOfBirth: string;
    fileName: string;
    fileUrl: string;
    firstName: string;
    gender: string;
    identity: string;
    lastName: string;
    nationality: string;
    phone: string;
    role: string;
    state: string;
    status: string;
    street: string;
    zip: string;
    agency: string;
    description: string;
  };
};

export type UpdateEditUserRequest = {
  city?: string | null;
  country?: string | null;
  phone?: string | null;
  role?: string | null;
  agency?: string | null;
  description?: string | null;
  userId?: string | null;
  qobrixContactId?: string | null;
};

export type UpdateUserResponse = {
  data: {
    statusCode: number;
    message: string;
  };
};

export type GetUserResponse = {
  data: {
    country: string;
    city: string;
    createdAt: string;
    dateOfBirth: string;
    email: string;
    fileName: string;
    fileUrl: string;
    firstName: string;
    gender: string;
    id: string;
    identity: string;
    isVerified: boolean;
    isDeleted: boolean;
    lastName: string;
    nationality: string;
    password: string;
    phone: string;
    role: string;
    state: string;
    status: string;
    street: string;
    updatedAt: string;
    verificationCode: string;
    zip: string;
    agency: string;
    description: string;
    avatarUrl: string;
    avatarPublicId: string;
  };
};

export type DeleteUserResponse = {
  data: { statusCode: number; message: string };
};

export type DeleteAvatarRequest = { userId: string; avatarPublicId: string };

export type ChatMember = {
  id: string;
  createdAt: string;
  updatedAt: string;
  email: string;
  password: string;
  isVerified: boolean;
  verificationCode: string | null;
  firstName: string;
  lastName: string;
  role: string | null;
  gender: string | null;
  dateOfBirth: string | null;
  nationality: string | null;
  identity: string | null;
  status: string | null;
  street: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  country: string | null;
  phone: string | null;
  userDocumentUrl: string | null;
  userDocumentPublicId: string | null;
  avatarUrl: string | null;
  avatarPublicId: string | null;
  qobrixContactId: string | null;
  qobrixAgentId: string | null;
  agencyName: string | null;
  description: string | null;
  isDeleted: boolean;
};
