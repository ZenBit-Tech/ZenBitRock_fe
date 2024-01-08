import { Chat } from "types";

export const sortChats = (chatsToSort: Chat[], sortByValue: string): Chat[] =>
  [...chatsToSort].sort((a, b) => {
    switch (sortByValue) {
      case 'oldest':
        return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();

      case 'nameIncrease':
        return a.title.localeCompare(b.title);

      case 'nameDecrease':
        return b.title.localeCompare(a.title);

      default:
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    }
  });