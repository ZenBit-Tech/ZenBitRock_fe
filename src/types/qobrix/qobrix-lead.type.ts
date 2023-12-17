import { QobrixPropertyType } from './property';
import { QobrixContact } from './qobrix-contact';
import { QobrixWorkflowStage } from './qobrix-workflow-stage.type';

type QobrixLead = {
  agent: string | null;
  apartment_type: string | null;
  bathrooms_from: number | null;
  bathrooms_to: number | null;
  bedrooms_from: number | null;
  bedrooms_to: number | null;
  buy_rent: string | null;
  contact_name: string;
  covered_area_from_amount: number | null;
  covered_area_to_amount: number | null;
  created_by: string | null;
  created: string | null;
  construction_stage: string | null;
  description: string | null;
  enquiry_type: string | null;
  house_type: string | null;
  status: string | null;
  id: string;
  list_selling_price: number | null;
  list_selling_price_from: number | null;
  list_selling_price_to: number | null;
  lowest_selling_price: number | null;
  list_rental_price_from: number | null;
  list_rental_price_to: number | null;
  list_letting_price: number | null;
  lowest_letting_price: number | null;
};

type QobrixLeadDetailsResponse = {
  data: QobrixLead & {
    contact_name_contact: QobrixContact;
    conversion_status_workflow_stage: QobrixWorkflowStage;
    property_type: QobrixPropertyType;
  };
};

export { type QobrixLead, type QobrixLeadDetailsResponse };
