import { useMemo } from 'react';
import useSWR from 'swr';
import { endpoints, fetcherQobrix } from 'utils/axios';
import { ILead, ILeadsFull, ILeadsParams } from 'types/lead';

const URL = endpoints.lead;

export function useGetLeads(id: string, params: ILeadsParams) {
  const { data, error } = useSWR([`${URL.list}${id}`, params], fetcherQobrix);

  if (error) {
    console.error('Error fetching properties:', error);
  }

  const memoizedValue = useMemo(() => {
    const leads = {
      data: data?.data.map((lead: ILead) => ({
        leadId: lead.id,
        status: lead.status,
        source: lead.source,
        contactName: lead.contact_name_contact.name,
        contactEmail: lead.contact_name_contact.email,
        contactId: lead.contact_name_contact.id,
        contactPhone: lead.contact_name_contact.phone,
      })),
      pagination: { hasNextPage: data?.pagination.has_next_page },
    };

    return {
      leads: leads as ILeadsFull,
      leadsError: error,
    };
  }, [data, error]);

  return memoizedValue;
}
