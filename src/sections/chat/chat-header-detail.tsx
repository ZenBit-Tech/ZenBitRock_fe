import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import { GetUserResponse } from 'types/user-data';

type Props = {
  user: GetUserResponse['data'];
};

export default function ChatHeaderDetail({ user: singleParticipant }: Props): JSX.Element {
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
