import { ChatMember } from 'types/user-data';

function getOpponentAvatar(userId: string, members: ChatMember[]): string | null {
  const opponent = members.find((member) => member.id !== userId);

  return opponent ? opponent.avatarUrl : null;
}

export { getOpponentAvatar };
