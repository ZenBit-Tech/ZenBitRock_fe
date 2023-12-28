import { Avatar, Card, ListItemButton, ListItemText } from '@mui/material';
import Iconify from 'components/iconify/iconify';
import { findCountryLabelByCode } from 'sections/verification-view/drop-box-data';
import { randomValues } from 'constants/randomValues';
import { UserChatResponse } from 'types/user-backend';
import MsgBadge from './chat-msg-badge';

type FollowerItemProps = {
  agent: UserChatResponse;
  handleClickResult: (agent: UserChatResponse) => void;
};

export default function AgentListItem({
  agent,
  handleClickResult,
}: FollowerItemProps): JSX.Element {
  const { firstName, lastName, country, avatarUrl } = agent;

  return (
    <Card>
      <ListItemButton
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: (theme) => theme.spacing(3, 2, 3, 3),
        }}
        onClick={() => handleClickResult(agent)}
      >
        <Avatar
          alt={`${firstName} ${lastName}`}
          src={avatarUrl}
          sx={{ width: 48, height: 48, mr: 2 }}
        />

        <ListItemText
          primary={`${firstName} ${lastName}`}
          secondary={
            <>
              <Iconify icon="mingcute:location-fill" width={16} sx={{ flexShrink: 0, mr: 0.5 }} />
              {findCountryLabelByCode(country)}
            </>
          }
          primaryTypographyProps={{
            noWrap: true,
            typography: 'subtitle2',
          }}
          secondaryTypographyProps={{
            mt: 0.5,
            noWrap: true,
            display: 'flex',
            component: 'span',
            alignItems: 'center',
            typography: 'caption',
            color: 'text.disabled',
          }}
        />
        <MsgBadge chatBadgeValue={randomValues.BADGE_TEMP_VALUE} />
      </ListItemButton>
    </Card>
  );
}