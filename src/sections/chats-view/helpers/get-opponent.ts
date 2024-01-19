import { ChatMember } from 'types/user-data';

type Props = {
  isPrivate: boolean;
  userId: string;
  members: ChatMember[];
};

function getOpponent({ isPrivate, userId, members }: Props): ChatMember | null {
  if (!isPrivate) return null;

  const interlocutor = members.find((member) => member.id !== userId);

  return interlocutor || null;
}

export { getOpponent };
