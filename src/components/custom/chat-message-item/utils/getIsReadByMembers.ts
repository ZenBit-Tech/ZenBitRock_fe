import { Message } from 'types';

type Props = {
  isReadBy: Message['isReadBy'];
  isMe: boolean;
  userId?: string;
  messageId: string;
  ownerId: string;
  chat: Message['chat'];
};

export function getIsReadByMembers({
  isReadBy,
  isMe,
  userId,
  messageId,
  ownerId,
  chat,
}: Props): boolean {
  const switcher = isReadBy && isReadBy.length > 0 && isMe ? true : false;

  function checkIsRead(boolean: boolean): boolean {
    return (
      isReadBy &&
      isReadBy.length > 0 &&
      isReadBy.filter(
        (object) =>
          object.userId ===
            chat.members
              .map((member) => member.id)
              .filter((memberFiltered) =>
                !boolean ? memberFiltered === userId : memberFiltered === ownerId
              )[0] && object.messageId === messageId
      )[0].isRead
    );
  }

  return switcher ? checkIsRead(true) : checkIsRead(false);
}
