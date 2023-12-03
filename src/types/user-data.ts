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
  };
};
