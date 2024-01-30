import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { searchParams } from 'components/custom/property/helpers/searchParams';
import { ApiRoute, StorageKey } from 'enums';
import {
  QobrixAgentRequest,
  QobrixAgentResponse,
  QobrixContactRequest,
  QobrixContactResponse,
  QobrixCreateLead,
  QobrixCreateLeadResponse,
  QobrixPropertyTypeResponse,
  QobrixPropertyListResponse,
  QobrixPropertyResponse,
  QobrixLeadListResponse,
  ILeadSmssResponse,
  ILeadEmailsResponse,
  ILeadCallsResponse,
  ILeadMeetingsResponse,
  ILeadTasksResponse,
  ILeadTaskChangesResponse,
  ILeadStatusChangesResponse,
  QobrixUserResponse,
  QobrixAddUserToGroupResponse,
  QobrixAddUserToGroupRequest,
  QobrixUserRequest,
  QobrixGetAllGroupsResponse,
} from 'types';
import { QobrixLocationsResponse } from 'types/qobrix/qobrix-locations';
import { IAgentUpdateQobrix, IUserUpdateQobrix } from 'types/user';

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
    createQobrixUser: builder.mutation<QobrixUserResponse['data'], QobrixUserRequest>({
      query: (body) => ({
        url: ApiRoute.QOBRIX_CREATE_USER,
        method: 'POST',
        body,
      }),
    }),
    getAllGroups: builder.query<QobrixGetAllGroupsResponse, void>({
      query: () => ({
        url: `${ApiRoute.QOBRIX_GROUPS}`,
        method: 'GET',
      }),
    }),
    addUserToGroup: builder.mutation<QobrixAddUserToGroupResponse, QobrixAddUserToGroupRequest>({
      query: ({ userId, groupId }) => ({
        url: `${ApiRoute.QOBRIX_GROUPS}/${groupId}/${ApiRoute.QOBRIX_USERS}/${userId}`,
        method: 'PUT',
      }),
    }),
    getPropertyTypes: builder.query<QobrixPropertyTypeResponse, undefined>({
      query: (body) => ({
        url: ApiRoute.QOBRIX_PROPERY_TYPES,
        method: 'GET',
        body,
        params: { limit: 100 },
      }),
    }),
    updateContact: builder.mutation<QobrixContactResponse['data'], IUserUpdateQobrix>({
      query: ({ qobrixId, ...body }) => ({
        url: `${ApiRoute.QOBRIX_CREATE_CONTACT}/${qobrixId}`,
        method: 'PATCH',
        body,
      }),
    }),
    updateAgent: builder.mutation<QobrixAgentResponse['data'], IAgentUpdateQobrix>({
      query: ({ qobrixAgentId, ...body }) => ({
        url: `${ApiRoute.QOBRIX_CREATE_AGENT}/${qobrixAgentId}`,
        method: 'PATCH',
        body,
      }),
    }),
    deleteLead: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `${ApiRoute.QOBRIX_DELETE_LEAD}/${id}`,
        method: 'DELETE',
      }),
    }),
    updateLead: builder.mutation<
      QobrixCreateLeadResponse['data'],
      { id: string; conversion_status: string }
    >({
      query: ({ id, conversion_status }) => ({
        url: `${ApiRoute.QOBRIX_UPDATE_LEAD}/${id}`,
        method: 'PATCH',
        body: { conversion_status },
      }),
    }),
    createLead: builder.mutation<QobrixCreateLeadResponse['data'], QobrixCreateLead>({
      query: (body) => ({
        url: ApiRoute.QOBRIX_CREATE_LEAD,
        method: 'POST',
        body,
      }),
    }),
    searchLocations: builder.query<
      QobrixLocationsResponse,
      { find: string; limit?: number; page?: number }
    >({
      query: ({ find, limit = 100, page = 1 }) => ({
        url: `${ApiRoute.QOBRIX_SEARCH_LOCATIONS}?find=${find}&limit=${limit}&page=${page}`,
        method: 'GET',
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
          name: property.name,
          saleRent: property.sale_rent,
          status: property.status,
          country: property.country,
          city: property.city,
          price: property.list_selling_price_amount,
          priceRental: property.list_rental_price_amount,
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
          priceRental: response?.data.list_rental_price_amount,
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
    }),
    getLeads: builder.query<
      QobrixLeadListResponse,
      {
        page: number;
        filter: string | undefined;
        searchString: string | undefined | null;
      }
    >({
      query: (arg) => ({
        url: ApiRoute.QOBRIX_GET_LEADS,
        method: 'GET',
        params: searchParams(arg.page, arg.filter, arg.searchString),
      }),
      transformResponse: (response: QobrixLeadListResponse) => {
        response.data = response.data.map((lead) => ({
          leadId: lead.id,
          status: lead.status,
          source: lead.source,
          lookingFor: lead.enquiry_type,
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
    getLeadSmses: builder.query<ILeadSmssResponse, { page: number; id: string }>({
      query: (arg) => ({
        url: ApiRoute.QOBRIX_GET_LEAD_SMSES.replace('id', arg.id),
        method: 'GET',
        params: { page: arg.page },
      }),
      transformResponse: (response: ILeadSmssResponse) => {
        response.data = response.data.map((message) => ({
          id: message.id,
          created: message.created,
          status: message.status,
          sender: message.sender,
          recipient: message.recipient,
          direction: message.direction,
        }));

        return response;
      },
      serializeQueryArgs: ({ endpointName }) => endpointName,

      merge: (currentCache, newItems) => {
        currentCache.data.push(...newItems.data);
        currentCache.pagination = newItems.pagination;
      },
      keepUnusedDataFor: 0,
    }),
    getLeadEmails: builder.query<ILeadEmailsResponse, { page: number; id: string }>({
      query: (arg) => ({
        url: ApiRoute.QOBRIX_GET_LEAD_EMAILS.replace('id', arg.id),
        method: 'GET',
        params: { page: arg.page },
      }),
      transformResponse: (response: ILeadEmailsResponse) => {
        response.data = response.data.map((message) => ({
          id: message.id,
          dateSent: message.date_sent,
          fromAddress: message.from_address,
          toAddress: message.toAddress,
          direction: message.direction,
        }));

        return response;
      },
      serializeQueryArgs: ({ endpointName }) => endpointName,

      merge: (currentCache, newItems) => {
        currentCache.data.push(...newItems.data);
        currentCache.pagination = newItems.pagination;
      },
      keepUnusedDataFor: 0,
    }),
    getLeadCalls: builder.query<ILeadCallsResponse, { page: number; id: string }>({
      query: (arg) => ({
        url: ApiRoute.QOBRIX_GET_LEAD_CALLS.replace('id', arg.id),
        method: 'GET',
        params: { page: arg.page },
      }),
      transformResponse: (response: ILeadCallsResponse) => {
        response.data = response.data.map((call) => ({
          id: call.id,
          status: call.status,
          subject: call.subject,
          startDate: call.start_date,
          direction: call.direction,
        }));

        return response;
      },
      serializeQueryArgs: ({ endpointName }) => endpointName,
      merge: (currentCache, newItems) => {
        currentCache.data.push(...newItems.data);
        currentCache.pagination = newItems.pagination;
      },
      keepUnusedDataFor: 0,
    }),
    getLeadMeetings: builder.query<ILeadMeetingsResponse, { page: number; id: string }>({
      query: (arg) => ({
        url: ApiRoute.QOBRIX_GET_LEAD_MEETINGS.replace('id', arg.id),
        method: 'GET',
        params: { page: arg.page },
      }),
      transformResponse: (response: ILeadMeetingsResponse) => {
        response.data = response.data.map((meeting) => ({
          id: meeting.id,
          status: meeting.status,
          subject: meeting.subject,
          startDate: meeting.start_date,
        }));

        return response;
      },
      serializeQueryArgs: ({ endpointName }) => endpointName,

      merge: (currentCache, newItems) => {
        currentCache.data.push(...newItems.data);
        currentCache.pagination = newItems.pagination;
      },
      keepUnusedDataFor: 0,
    }),
    getLeadTasks: builder.query<ILeadTasksResponse, { page: number; id: string }>({
      query: (arg) => ({
        url: ApiRoute.QOBRIX_GET_LEAD_TASKS.replace('id', arg.id),
        method: 'GET',
        params: { page: arg.page },
      }),
      transformResponse: (response: ILeadTasksResponse) => {
        response.data = response.data.map((task) => ({
          id: task.id,
          status: task.status,
          subject: task.subject,
          created: task.created,
        }));

        return response;
      },
      serializeQueryArgs: ({ endpointName }) => endpointName,
      merge: (currentCache, newItems) => {
        currentCache.data.push(...newItems.data);
        currentCache.pagination = newItems.pagination;
      },
      keepUnusedDataFor: 0,
    }),
    getLeadTaskChanges: builder.query<ILeadTaskChangesResponse, { page: number; id: string }>({
      query: (arg) => ({
        url: ApiRoute.QOBRIX_GET_LEAD_TASK_CHANGES.replace('id', arg.id),
        method: 'GET',
        params: { page: arg.page },
      }),
      transformResponse: (response: ILeadTaskChangesResponse) => {
        response.data = response.data.map((task) => ({
          id: task.id,
          timestamp: task.timestamp,
          originalStatus: task.original?.status,
          changedStatus: task.changed?.status,
        }));

        return response;
      },
      serializeQueryArgs: ({ endpointName }) => endpointName,
      merge: (currentCache, newItems) => {
        currentCache.data.push(...newItems.data);
        currentCache.pagination = newItems.pagination;
      },
      keepUnusedDataFor: 0,
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
    getLeadStatusChanges: builder.query<ILeadStatusChangesResponse, { page: number; id: string }>({
      query: (arg) => ({
        url: ApiRoute.QOBRIX_GET_LEAD_STATUS_CHANGES.replace('id', arg.id),
        method: 'GET',
        params: { page: arg.page },
      }),
      transformResponse: (response: ILeadStatusChangesResponse) => {
        response.data = response.data.map((status) => ({
          id: status.id,
          timestamp: status.timestamp,
          originalStatus: status.original?.status,
          changedStatus: status.changed?.status,
        }));

        return response;
      },
      serializeQueryArgs: ({ endpointName }) => endpointName,

      merge: (currentCache, newItems) => {
        currentCache.data.push(...newItems.data);
        currentCache.pagination = newItems.pagination;
      },
      keepUnusedDataFor: 0,
    }),
  }),
});

export const {
  useLazyGetLeadTaskChangesQuery,
  useCreateContactMutation,
  useCreateAgentMutation,
  useCreateQobrixUserMutation,
  useGetAllGroupsQuery,
  useAddUserToGroupMutation,
  useGetPropertyTypesQuery,
  useUpdateContactMutation,
  useUpdateAgentMutation,
  useDeleteLeadMutation,
  useCreateLeadMutation,
  useUpdateLeadMutation,
  useSearchLocationsQuery,
  useGetPropertiesQuery,
  useGetPropertyQuery,
  useGetLeadsQuery,
  useGetLeadCallsQuery,
  useGetLeadStatusChangesQuery,
  useGetLeadEmailsQuery,
  useGetLeadMeetingsQuery,
  useGetLeadSmsesQuery,
  useGetLeadTasksQuery,
} = QobrixApi;
