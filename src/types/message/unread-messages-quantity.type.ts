export type IUnreadMessagesQuantity = number;

export type IUnreadMessagesQuantityRequest = { id: string; type?: string; typeId?: string };

export type IUnreadMessagesQuantityResponse = { data: IUnreadMessagesQuantity };
