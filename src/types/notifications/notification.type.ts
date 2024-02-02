type AppNotification = {
  text: string;
  type: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  recipients: { id: string; isRead: boolean; user: { id: string } }[];
};

export { type AppNotification };
