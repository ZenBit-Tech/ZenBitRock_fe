export type GetUserRequest = {
  id: string;
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
  };
};

export type GetUserResponse = {
  data: {
    country: string;
    city: string | null;
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
  };
};
