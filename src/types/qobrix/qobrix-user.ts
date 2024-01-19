export type QobrixUserRequest = {
  contact_id: string;
  username: string;
  active: boolean;
}

export type QobrixUserResponse = {
  data: {
    data: {
      contact_id: string;
      username: string;
      active: boolean;
      created: string;
      modified: string;
      created_by: string;
      modified_by: string;
      id: string;
      is_admin: boolean;
      name: string;
      extra: {
        first_name: string;
        email: string;
        phone_mobile: string;
      }
    }
  }
}
