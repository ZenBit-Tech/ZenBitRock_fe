export type ILead = {
  id: string;
  leadId: string;
  status: string;
  source: string | null;
  contactName: string;
  contactEmail: string;
  contactId: string;
  contactPhone: string;
  contact_name_contact: {
    name: string;
    email: string;
    id: string;
    phone: string;
  };
};

export type ILeads = ILead[];

export type ILeadsFull = {
  data: ILeads;
  pagination: ILeadsPagination;
};

export type ILeadsParams = {
  params: ILeadsParamsList;
};

export type ILeadsParamsList = {
  page: number;
  limit: number;
  fields?: string[];
  sort?: string[];
  search?: string;
};

export type ILeadsPagination = {
  pageCount: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  count: number;
  limit: number;
};
