import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ChatEvent, StorageKey } from 'enums';
import { AppNotification } from 'types';

import { createSocketFactory } from 'utils';

const getSocket = createSocketFactory();

export const NotificationApi = createApi({
  reducerPath: 'NotificationApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem(StorageKey.TOKEN);

      headers.set('Authorization', `Bearer ${token}`);

      return headers;
    },
  }),
  tagTypes: ['Notification'],
  endpoints: (builder) => ({
    getNotifications: builder.query<AppNotification[], { userId: string }>({
      queryFn: () => ({ data: [] }),
      providesTags: ['Notification'],

      async onCacheEntryAdded(arg, { cacheDataLoaded, cacheEntryRemoved, updateCachedData }) {
        try {
          await cacheDataLoaded;

          const socket = getSocket();

          socket.emit(
            ChatEvent.RequestAllNotifications,
            arg,
            (notifications: AppNotification[]) => {
              updateCachedData((draft) => {
                draft.splice(0, draft.length, ...notifications);
              });
            }
          );

          socket.on(ChatEvent.NewNotification, (notification: AppNotification) => {
            updateCachedData((draft) => {
              draft.push(notification);
            });
          });

          await cacheEntryRemoved;
        } catch (error) {
          throw error;
        }
      },
    }),
  }),
});

export const { useGetNotificationsQuery } = NotificationApi;
