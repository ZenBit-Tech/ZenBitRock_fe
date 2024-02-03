import { Message } from 'types';

type Props = {
  likes: Message['likes'];
  isMe: boolean;
  userId?: string;
  messageId: string;
  ownerId: string;
  chat: Message['chat'];
};

export function getLike({ likes, isMe, userId, messageId, ownerId, chat }: Props): number {
  const switcher = likes && likes.length > 0 && isMe ? true : false;

  function checkLike(boolean: boolean): number {
    const filteredMemberId = chat.members
      .map((member) => member.id)
      .filter((memberFiltered) =>
        !boolean ? memberFiltered === userId : memberFiltered === ownerId
      )[0];

    const likeObject =
      likes &&
      likes.length > 0 &&
      likes.find((object) => object.userId === filteredMemberId && object.messageId === messageId);

    return likeObject ? likeObject.like : 0;
  }

  return switcher ? checkLike(true) : checkLike(false);
}
