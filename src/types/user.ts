import { CustomFile } from 'components/upload';

export type IUserTableFilterValue = string | string[];

export type IUserTableFilters = {
  name: string;
  role: string[];
  status: string;
};

export type IUserSocialLink = {
  facebook: string;
  instagram: string;
  linkedin: string;
  twitter: string;
};

export type IUserProfileCover = {
  name: string;
  coverUrl?: string;
  avatarUrl?: string;
};

export type IUserProfile = {
  id: string;
  role: string;
  quote: string;
  email: string;
  school: string;
  country: string;
  city: string;
  company: string;
  totalFollowers: number;
  totalFollowing: number;
  socialLinks: IUserSocialLink;
  agency?: string;
};

export type IUserUpdateProfile = {
  city?: string | null;
  country?: string | null;
  about?: string | null;
  agencyName?: string | null;
  phone?: string | null;
  role?: string | null;
  email?: string | null;
  userId?: string | null;
  qobrixContactId?: string | null;
  description?: string | null;
};

export type IUserProfileFollower = {
  id: string;
  name: string;
  country: string;
  avatarUrl: string;
};

export type IUserProfileGallery = {
  id: string;
  title: string;
  imageUrl: string;
  postedAt: Date;
};

export type IUserProfileFriend = {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
};

export type IUserProfilePost = {
  id: string;
  media: string;
  message: string;
  createdAt: Date;
  personLikes: {
    name: string;
    avatarUrl: string;
  }[];
  comments: {
    id: string;
    message: string;
    createdAt: Date;
    author: {
      id: string;
      name: string;
      avatarUrl: string;
    };
  }[];
};

export type IUserCard = {
  id: string;
  name: string;
  role: string;
  coverUrl: string;
  avatarUrl: string;
  totalPosts: number;
  totalFollowers: number;
  totalFollowing: number;
};

export type IUserItem = {
  id: string;
  name: string;
  city: string;
  role: string;
  email: string;
  state: string;
  status: string;
  address: string;
  country: string;
  zipCode: string;
  company: string;
  avatarUrl: string;
  phoneNumber: string;
  isVerified: boolean;
  agency: string;
};

export type IUserEditItem = {
  country?: string;
  city?: string;
  createdAt?: string;
  dateOfBirth?: string;
  email?: string;
  fileName?: string;
  fileUrl?: string;
  firstName?: string;
  gender?: string;
  id?: string;
  identity?: string;
  isVerified: boolean;
  lastName?: string;
  nationality?: string;
  password?: string;
  phone?: string;
  role?: string;
  state?: string;
  status?: string;
  street?: string;
  updatedAt?: string;
  verificationCode?: string;
  zip?: string;
  agency?: string;
  description?: string;
  avatarUrl?: string;
};

export type IUserAccount = {
  email: string;
  isPublic: boolean;
  displayName: string;
  city: string | null;
  state: string | null;
  about: string | null;
  country: string | null;
  address: string | null;
  zipCode: string | null;
  phoneNumber: string | null;
  photoURL: CustomFile | string | null;
};

export type IUserAccountBillingHistory = {
  id: string;
  price: number;
  createdAt: Date;
  invoiceNumber: string;
};

export type IUserAccountChangePassword = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};
