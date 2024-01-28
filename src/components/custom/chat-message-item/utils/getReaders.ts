import { Message } from 'types';
import { UserChatResponse } from 'types/user-backend';

type Props = {
  isReadBy: Message['isReadBy'];
  usersData: UserChatResponse[] | undefined;
  members: string[];
  userId: string | undefined;
};

type Answer = { memberId: string; memberName: string; isReadByMember: boolean };

export function getReaders({ isReadBy, usersData, members, userId }: Props): Answer[] | undefined {
  if (usersData && isReadBy) {
    const readers: Answer[] = [];

    members.forEach((member) => {
      const firstName = usersData.find((user) => user.id === member)?.firstName;
      const lastName = usersData.find((user) => user.id === member)?.lastName;

      if (member !== userId && firstName && firstName.toLowerCase() !== 'deleted') {
        const reader: Answer = {
          memberId: member,
          memberName: `${firstName} ${lastName}`,
          isReadByMember: isReadBy.find((item) => item.userId === member)?.isRead || false,
        };

        readers.push(reader);
      }
    });

    return readers;
  }

  return undefined;
}
