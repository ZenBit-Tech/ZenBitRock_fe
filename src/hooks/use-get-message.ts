import { IChatParticipant, IChatMessage } from 'types/chat';

type Props = {
  message: IChatMessage;
  currentUserId: string;
  participants: IChatParticipant[];
};

type OutputParams = {
  hasImage: boolean;
  me: boolean;
  senderDetails:
    | {
        type: string;
        avatarUrl?: undefined;
        firstName?: undefined;
      }
    | {
        avatarUrl: string | undefined;
        firstName: string | undefined;
        type?: undefined;
      };
};

export function useGetMessage({ message, participants, currentUserId }: Props): OutputParams {
  const sender = participants.find((participant) => participant.id === message.senderId);

  const senderDetails =
    message.senderId === currentUserId
      ? {
          type: 'me',
        }
      : {
          avatarUrl: sender?.avatarUrl,
          firstName: sender?.name.split(' ')[0],
        };

  const me = senderDetails.type === 'me';

  const hasImage = message.contentType === 'image';

  return {
    hasImage,
    me,
    senderDetails,
  };
}
