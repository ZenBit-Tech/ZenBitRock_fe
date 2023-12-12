import { useMemo } from 'react';
import useSWR from 'swr';
import { endpoints, fetcherQobrix } from 'utils/axios';
import { ILeadItem, ILeads, ILeadsParams } from 'types/lead';

const URL = endpoints.lead;

export function useGetLeads(id: string, params: ILeadsParams) {
  const { data, error } = useSWR([`${URL.list}/${id}`, params], fetcherQobrix);

  if (error) {
    console.error('Error fetching properties:', error);
  }

  const memoizedValue = useMemo(() => {
    const leads = {
      data: data?.data.map((lead: ILeadItem) => ({
        ...lead,
        id: lead.id,
        saleRent: lead.sale_rent,
        status: lead.status,
        country: lead.country,
        city: lead.city,
        price: lead.list_selling_price_amount,
        photo: lead.media?.[0]?.file?.thumbnails?.medium || null,
      })),
      pagination: { hasNextPage: data?.pagination.has_next_page },
    };

    return {
      leads: leads as ILeads,
      leadsError: error,
    };
  }, [data, error]);

  return memoizedValue;
}
