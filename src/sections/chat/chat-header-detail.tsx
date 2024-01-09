import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import { UserChatResponse } from 'types/user-backend';
import { LoadingScreen } from 'components/loading-screen';

type Props = {
  user: UserChatResponse;
};

export default function ChatHeaderDetail({ user: singleParticipant }: Props): JSX.Element {
  if (!singleParticipant) {
    return <LoadingScreen />;
  }

  const { avatarUrl, firstName, lastName } = singleParticipant;

  const renderSingle = (
    <Stack flexGrow={1} direction="row" alignItems="center" spacing={2}>
      <Avatar src={avatarUrl} alt={firstName}>
        {!avatarUrl && firstName && lastName
          ? `${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`
          : null}
      </Avatar>

      <ListItemText primary={`${firstName} ${lastName}`} />
    </Stack>
  );

  return (
    <>
      {renderSingle}

      <Stack flexGrow={1} />
    </>
  );
}
