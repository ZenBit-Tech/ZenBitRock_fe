import { StorageKey } from 'enums';
import { Socket, io } from 'socket.io-client';

const createSocketFactory = (namespace?: string): (() => Socket) => {
  let socket: Socket;

  return (): Socket => {
    if (!socket) {
      let accessToken = '';

      if (typeof localStorage !== 'undefined') {
        accessToken = localStorage.getItem(StorageKey.TOKEN) ?? '';
      }

      const host = process.env.NEXT_PUBLIC_BASE_HOST as string;
      const socketUri = namespace ? `${host}/${namespace}` : host;

      socket = io(socketUri, {
        auth: {
          token: accessToken,
        },
        transports: ['websocket', 'polling'],
        withCredentials: true,
      });
    }

    if (socket.disconnected) {
      socket.connect();
    }

    return socket;
  };
};

export { createSocketFactory };
