import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiRoute, StorageKey } from 'enums';
import {
  QobrixAgentRequest,
  QobrixAgentResponse,
  QobrixContactRequest,
  QobrixContactResponse,
  QobrixPropertyType,
  QobrixLeadListResponse,
} from 'types';
import { IUserUpdateQobrix } from 'types/user';

export const QobrixApi = createApi({
  reducerPath: 'QobrixApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_QOBRIX_PROXY_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem(StorageKey.TOKEN);

      headers.set('Authorization', `Bearer ${token}`);

      return headers;
    },
  }),
  tagTypes: ['Create qobrix contact'],
  endpoints: (builder) => ({
    createContact: builder.mutation<QobrixContactResponse['data'], QobrixContactRequest>({
      query: (body) => ({
        url: ApiRoute.QOBRIX_CREATE_CONTACT,
        method: 'POST',
        body,
      }),
    }),
    createAgent: builder.mutation<QobrixAgentResponse['data'], QobrixAgentRequest>({
      query: (body) => ({
        url: ApiRoute.QOBRIX_CREATE_AGENT,
        method: 'POST',
        body,
      }),
    }),
    getPropertyTypes: builder.query<QobrixPropertyType, undefined>({
      query: (body) => ({
        url: ApiRoute.QOBRIX_PROPERY_TYPES,
        method: 'GET',
        body,
      }),
    }),
    updateContact: builder.mutation<QobrixContactResponse['data'], IUserUpdateQobrix>({
      query: ({ qobrixId, ...body }) => ({
        url: `${ApiRoute.QOBRIX_CREATE_CONTACT}/${qobrixId}`,
        method: 'PATCH',
        body,
      }),
    }),
    getLeads: builder.query<
      QobrixLeadListResponse,
      { page: number; filter: string | undefined; id: string | undefined }
    >({
      query: (arg) => ({
        url: !arg.id
          ? ApiRoute.QOBRIX_GET_LEADS
          : ApiRoute.QOBRIX_GET_PROPERTY_LEADS.replace('id', arg.id),
        method: 'GET',
        params: arg.filter ? { page: arg.page, search: arg.filter } : { page: arg.page },
      }),
      transformResponse: (response: QobrixLeadListResponse) => {
        response.data = response.data.map((lead) => ({
          leadId: lead.id,
          status: lead.status,
          source: lead.source,
          contactName: lead.contact_name_contact?.name,
          contactEmail: lead.contact_name_contact?.email,
          contactId: lead.contact_name_contact?.id,
          contactPhone: lead.contact_name_contact?.phone,
        }));

        return response;
      },
      serializeQueryArgs: ({ endpointName }) => endpointName,

      merge: (currentCache, newItems) => {
        if (!newItems.pagination.has_prev_page) {
          currentCache.data = newItems.data;
        } else {
          currentCache.data.push(...newItems.data);
        }
        currentCache.pagination = newItems.pagination;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
  }),
});

export const {
  useCreateContactMutation,
  useCreateAgentMutation,
  useGetPropertyTypesQuery,
  useUpdateContactMutation,
  useGetLeadsQuery,
} = QobrixApi;
