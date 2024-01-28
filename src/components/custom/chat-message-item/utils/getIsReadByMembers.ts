import { Message } from 'types';

type Props = {
  isReadBy: Message['isReadBy'];
  userId?: string;
};

export function getIsReadByMembers({ isReadBy, userId }: Props): boolean {
  const answer =
    isReadBy &&
    isReadBy.length > 0 &&
    userId &&
    isReadBy.filter((object) => object.userId !== userId).some((reader) => reader.isRead);

  return answer ? answer : false;
}
