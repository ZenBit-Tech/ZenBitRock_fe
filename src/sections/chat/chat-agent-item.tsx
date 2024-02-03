import { Avatar, Card, ListItemButton, ListItemText } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import Iconify from 'components/iconify/iconify';
import { useTranslations, useState, useEffect, useCallback, useRouter } from 'hooks';
import { AppRoute } from 'enums';
import { findCountryLabelByCode } from 'sections/verification-view/drop-box-data';
import { UserChatResponse } from 'types/user-backend';
import { useGetUnreadMessagesCountByChatIdQuery, useCheckPrivateChatMutation } from 'store/chat';
import MsgBadge from './chat-msg-badge';

type FollowerItemProps = {
  agent: UserChatResponse;
  className: string;
  chatId?: string;
};

export default function AgentListItem({
  agent,
  className,
  chatId,
}: FollowerItemProps): JSX.Element {
  const [quantity, setQuentity] = useState<number | undefined>(0);

  const t = useTranslations('agents');
  const router = useRouter();

  const { firstName, lastName, country, city, avatarUrl, isDeleted, id } = agent;
  const { data } = useGetUnreadMessagesCountByChatIdQuery({ chatId });

  const [checkPrivateChat] = useCheckPrivateChatMutation();

  useEffect(() => {
    if (chatId) {
      setQuentity(data);
    }
  }, [chatId, data]);

  const handleClick = useCallback(async () => {
    try {
      const response = await checkPrivateChat(id).unwrap();

      router.push(`${AppRoute.CHATS_PAGE}/${response.chatId}`);
    } catch (err) {
      enqueueSnackbar(t('error'), { variant: 'error' });
    }
  }, [router, id, t]);

  return (
    <Card sx={{ mb: '5px' }} className={className}>
      <ListItemButton
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: (theme) => theme.spacing(3, 2, 3, 3),
        }}
        onClick={handleClick}
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
                {isDeleted ? t('InfoDeleted') : `${findCountryLabelByCode(country)}, ${city}`}
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
        <MsgBadge chatBadgeValue={quantity ? quantity : 0} />
      </ListItemButton>
    </Card>
  );
}
