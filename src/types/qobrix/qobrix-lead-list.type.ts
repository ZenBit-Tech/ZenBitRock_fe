type QobrixLeadItem = {
  id?: string;
  leadId?: string;
  status: string;
  source: string | null;
  contactName?: string;
  contactEmail?: string;
  contactId?: string;
  contactPhone?: string;
  contact_name_contact?: {
    name?: string;
    email?: string;
    id?: string;
    phone?: string;
  };
};

type QobrixLeadList = QobrixLeadItem[];

export { type QobrixLeadItem, type QobrixLeadList };
