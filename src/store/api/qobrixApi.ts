import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiRoute, StorageKey } from 'enums';
import {
  QobrixAgentRequest,
  QobrixAgentResponse,
  QobrixContactRequest,
  QobrixContactResponse,
  QobrixPropertyTypeResponse,
  QobrixPropertyListResponse,
  QobrixPropertyResponse,
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
    getPropertyTypes: builder.query<QobrixPropertyTypeResponse, undefined>({
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
    getProperties: builder.query<QobrixPropertyListResponse, { page: number; search: string }>({
      query: (arg) => ({
        url: ApiRoute.QOBRIX_GET_PROPERTIES,
        method: 'GET',
        params: arg.search ? { page: arg.page, search: arg.search } : { page: arg.page },
      }),
      transformResponse: (response: QobrixPropertyListResponse) => {
        response.data = response.data.map((property) => ({
          id: property.id,
          saleRent: property.sale_rent,
          status: property.status,
          country: property.country,
          city: property.city,
          price: property.list_selling_price_amount,
          photo: property.media?.[0]?.file?.thumbnails?.medium || null,
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
    getProperty: builder.query<QobrixPropertyResponse, string>({
      query: (arg) => ({
        url: ApiRoute.QOBRIX_GET_PROPERTY.replace('id', arg),
        method: 'GET',
      }),
      transformResponse: (response: QobrixPropertyResponse) => {
        response.data = {
          saleRent: response?.data.sale_rent,
          status: response?.data.status,
          country: response?.data.country,
          city: response?.data.city,
          price: response?.data.list_selling_price_amount,
          media: response?.data.media,
          description: response?.data.description,
          name: response?.data.name,
          propertyType: response?.data.property_type,
          bedrooms: response?.data.bedrooms,
          bathrooms: response?.data.bathrooms,
          livingrooms: response?.data.living_rooms,
          kitchenType: response?.data.kitchen_type,
          verandas: response?.data.verandas,
          parking: response?.data.parking,
          coordinates: response?.data.coordinates,
          municipality: response?.data.municipality,
          state: response?.data.state,
          postCode: response?.data.post_code,
          street: response?.data.street,
          floorNumber: response?.data.floor_number,
          seaView: response?.data.sea_view,
          mountainView: response?.data.mountain_view,
          privateSwimmingPool: response?.data.private_swimming_pool,
          commonSwimmingPool: response?.data.common_swimming_pool,
          petsAllowed: response?.data.pets_allowed,
          elevator: response?.data.elevator,
          listingDate: response?.data.listing_date,
          internalAreaAmount: response?.data.internal_area_amount,
          coveredVerandasAmount: response?.data.covered_verandas_amount,
          landType: response?.data.land_type,
          communityFeatures: response?.data.community_features,
          unit: response?.data.unit_number,
          electricity: response?.data.electricity,
          reception: response?.data.reception,
          water: response?.data.water,
          air: response?.data.air_condition,
          alarm: response?.data.alarm,
          fireplace: response?.data.fireplace,
          smart: response?.data.smart_home,
          storage: response?.data.storage_space,
          heating: response?.data.heating_type,
        };

        return response;
      },
      serializeQueryArgs: ({ endpointName }) => endpointName,

      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
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
    getSmses: builder.query<QobrixPropertyResponse, string>({
      query: (arg) => ({
        url: ApiRoute.QOBRIX_GET_LEADS_SMSES.replace('id', arg),
        method: 'GET',
      }),
    }),
    getEmails: builder.query<QobrixPropertyResponse, string>({
      query: (arg) => ({
        url: ApiRoute.QOBRIX_GET_LEADS_EMAILS.replace('id', arg),
        method: 'GET',
      }),
    }),
    getCalls: builder.query<QobrixPropertyResponse, string>({
      query: (arg) => ({
        url: ApiRoute.QOBRIX_GET_LEADS_CALLS.replace('id', arg),
        method: 'GET',
      }),
    }),
    getMeetings: builder.query<QobrixPropertyResponse, string>({
      query: (arg) => ({
        url: ApiRoute.QOBRIX_GET_LEADS_MEETINGS.replace('id', arg),
        method: 'GET',
      }),
    }),
    getTasks: builder.query<QobrixPropertyResponse, string>({
      query: (arg) => ({
        url: ApiRoute.QOBRIX_GET_LEADS_TASKS.replace('id', arg),
        method: 'GET',
      }),
    }),
    getTasksWorkflow: builder.query<QobrixPropertyResponse, string>({
      query: (arg) => ({
        url: ApiRoute.QOBRIX_GET_LEADS_TASKS_WORKFLOW.replace('id', arg),
        method: 'GET',
      }),
    }),
    getChangelogs: builder.query<QobrixPropertyResponse, string>({
      query: (arg) => ({
        url: ApiRoute.QOBRIX_GET_LEADS_CHANGELOG.replace('id', arg),
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useCreateContactMutation,
  useCreateAgentMutation,
  useGetPropertyTypesQuery,
  useUpdateContactMutation,
  useGetPropertiesQuery,
  useGetPropertyQuery,
  useGetLeadsQuery,
  useGetCallsQuery,
  useGetChangelogsQuery,
  useGetEmailsQuery,
  useGetMeetingsQuery,
  useGetSmsesQuery,
  useGetTasksQuery,
  useGetTasksWorkflowQuery,
} = QobrixApi;
