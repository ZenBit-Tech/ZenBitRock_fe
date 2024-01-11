import { ChatMember } from 'types/user-data';

function getInterlocutorAvatar(userId: string, members: ChatMember[]): string | null {
  const interlocutor = members.find((member) => member.id !== userId);

  return interlocutor ? interlocutor.avatarUrl : null;
}

export { getInterlocutorAvatar };
