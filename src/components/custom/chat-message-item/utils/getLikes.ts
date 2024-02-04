import { Message } from 'types';
import { UserChatResponse } from 'types/user-backend';

type Props = {
  likes: Message['likes'];
  usersData: UserChatResponse[] | undefined;
  members: string[];
  userId: string | undefined;
};

type Answer = { memberId: string; memberName: string; likeByMember: number };

export function getLikes({ likes, usersData, members, userId }: Props): Answer[] | undefined {
  if (usersData && likes) {
    const readers: Answer[] = [];

    members.forEach((member) => {
      const firstName = usersData.find((user) => user.id === member)?.firstName;
      const lastName = usersData.find((user) => user.id === member)?.lastName;

      if (member !== userId && firstName && firstName.toLowerCase() !== 'deleted') {
        const reader: Answer = {
          memberId: member,
          memberName: `${firstName} ${lastName}`,
          likeByMember: Number(likes.find((item) => item.userId === member)?.like) || 0,
        };

        readers.push(reader);
      }
    });

    return readers;
  }

  return undefined;
}
