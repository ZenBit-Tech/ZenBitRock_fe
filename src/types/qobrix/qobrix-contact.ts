export type QobrixContactRequest = {
  first_name: string;
  last_name: string;
  role: string;
  birthdate: string;
  nationality: string;
  street: string;
  country: string;
  state: string;
  city: string | null;
  post_code: string;
  email: string;
  phone: string;
  legacy_id: string;
};

export type QobrixContactResponse = {
  data: {
    data: {
      birthdate: string;
      city: string;
      country: string;
      created: string;
      created_by: string;
      description: string;
      email: string;
      first_name: string;
      last_name: string;
      id: string;
      legacy_id: string;
      modified: string;
      modified_by: string;
      name: string;
      nationality: string;
      phone: string;
      post_code: string;
      ref: number;
      role: string;
      state: string;
      street: string;
    };
  };
};

interface ContactNameContact {
  name?: string;
}

export type QobrixLeadFilterResponse = {
  data: {
    data: {
      contact_name_contact: ContactNameContact;
      [key: string]: unknown;
    }[];
    pagination: { [key: string]: unknown };
  };
};
