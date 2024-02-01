import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ChatEvent, StorageKey } from 'enums';
import { getSocket } from 'store/app-socket-factory';
import { AppNotification } from 'types';

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
  tagTypes: ['Notification', 'NotificationCount'],
  endpoints: (builder) => ({
    getNotifications: builder.query<AppNotification[], { userId: string }>({
      queryFn: (userId: { userId: string }) => {
        const socket = getSocket();

        return new Promise((resolve) => {
          socket.emit(
            ChatEvent.RequestAllNotifications,
            userId,
            (notifications: AppNotification[]) => {
              resolve({ data: notifications });
            }
          );
        });
      },
      providesTags: ['Notification'],

      async onCacheEntryAdded(arg, { cacheDataLoaded, cacheEntryRemoved, updateCachedData }) {
        try {
          await cacheDataLoaded;

          const socket = getSocket();

          socket.on(ChatEvent.NewNotification, (notification: AppNotification) => {
            updateCachedData((draft) => {
              draft.unshift(notification);
            });
          });

          await cacheEntryRemoved;
        } catch (error) {
          throw error;
        }
      },
    }),
    deleteNotificationToUser: builder.mutation<boolean, { notificationId: string; userId: string }>(
      {
        queryFn: (notificationToUser: { notificationId: string; userId: string }) => {
          const socket = getSocket();
          const { notificationId, userId } = notificationToUser;

          return new Promise((resolve) => {
            socket.emit(
              ChatEvent.DeleteNotificationToUser,
              { notificationId, userId },
              (deleteResult: boolean) => {
                resolve({ data: deleteResult });
              }
            );
          });
        },
        invalidatesTags: (result, error, arg) => [
          { type: 'Notification', userId: arg.userId },
          { type: 'NotificationCount', userId: arg.userId },
        ],
      }
    ),
    notificationMarkAsRead: builder.mutation<boolean, { notificationId: string; userId: string }>({
      queryFn: (notificationToUser: { notificationId: string; userId: string }) => {
        const socket = getSocket();
        const { notificationId, userId } = notificationToUser;

        return new Promise((resolve) => {
          socket.emit(
            ChatEvent.NotificationMarkAsRead,
            { notificationId, userId },
            (updateResult: boolean) => {
              resolve({ data: updateResult });
            }
          );
        });
      },
      invalidatesTags: (result, error, arg) => [
        { type: 'Notification', userId: arg.userId },
        { type: 'NotificationCount', userId: arg.userId },
      ],
    }),
    getNewNotificationsCount: builder.query<number, { userId: string }>({
      queryFn: (userId: { userId: string }) => {
        const socket = getSocket();

        return new Promise((resolve) => {
          socket.emit(
            ChatEvent.RequestNewNotificationsCount,
            userId,
            (newNotificationsCount: number) => {
              resolve({ data: newNotificationsCount });
            }
          );
        });
      },
      providesTags: ['NotificationCount'],
      async onCacheEntryAdded(arg, { cacheDataLoaded, cacheEntryRemoved, updateCachedData }) {
        try {
          await cacheDataLoaded;

          const socket = getSocket();

          socket.on(ChatEvent.NewNotification, (notification: AppNotification) => {
            updateCachedData((draft) => {
              const id = notification.recipients.find(
                (recipient) => recipient.user.id === arg.userId
              );

              if (id) {
                draft += 1;
              }

              return draft;
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

export const {
  useGetNotificationsQuery,
  useDeleteNotificationToUserMutation,
  useNotificationMarkAsReadMutation,
  useGetNewNotificationsCountQuery,
} = NotificationApi;
