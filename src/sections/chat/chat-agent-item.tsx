import { useTranslations } from 'next-intl';
import { Avatar, Card, ListItemButton, ListItemText } from '@mui/material';
import Iconify from 'components/iconify/iconify';
import { findCountryLabelByCode } from 'sections/verification-view/drop-box-data';
import { randomValues } from 'constants/randomValues';
import { UserChatResponse } from 'types/user-backend';
import MsgBadge from './chat-msg-badge';

type FollowerItemProps = {
  agent: UserChatResponse;
  handleClickResult: (agent: UserChatResponse) => void;
  className: string;
};

export default function AgentListItem({
  agent,
  handleClickResult,
  className,
}: FollowerItemProps): JSX.Element {

  const t = useTranslations('agents');
  
  const { firstName, lastName, country, city, avatarUrl, isDeleted } = agent;

  return (
    <Card sx={{ mb: '5px' }} className={className}>
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
        >
          {!avatarUrl && firstName && lastName
            ? `${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`
            : null}
        </Avatar>

        <ListItemText
          primary={`${firstName} ${lastName} ${isDeleted ? t('deleted') : ''}`}
          secondary={
            <>
              <Iconify icon="mingcute:location-fill" width={16} sx={{ flexShrink: 0, mr: 0.5 }} />
              <span style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                {`${findCountryLabelByCode(country)}, ${city}`}
              </span>
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
