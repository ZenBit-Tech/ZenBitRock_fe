import { Chat, Message } from 'types';
import { UserChatResponse } from 'types/user-backend';

type Props = {
  isReadBy: Message['isReadBy'];
  usersData: UserChatResponse[];
  members: Chat['members'];
  ownerId: string;
  chat: Message['chat'];
};

type Answer = { memberId: string; memberName: string; isReadByMember: boolean };

export function getReaders({ isReadBy, usersData, members, ownerId }: Props): Answer[] {
  const readers: Answer[] = [];

  members.forEach((member) => {
    if (member.id !== ownerId) {
      const reader: Answer = {};
      const found = usersData.find((user) => user.id === member.id);

      reader.memberId = member.id;
      reader.memberName = `${found?.firstName} ${found?.lastName}`;
      reader.isReadByMember = isReadBy.find((item) => item.userId === member.id)?.isRead;

      readers.push(reader);
    }
  });

  return readers;
}
