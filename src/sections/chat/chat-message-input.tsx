import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslations } from 'next-intl';
import { enqueueSnackbar } from 'notistack';
import Stack from '@mui/material/Stack';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import uuidv4 from 'utils/uuidv4';
import Iconify from 'components/iconify';
import { LoadingScreen } from 'components/loading-screen';
import { IChatMessage } from 'types/chat';
import { RootState } from 'store';

type Props = {
  disabled?: boolean;
  selectedConversationId?: string;
  addMessage: (message: IChatMessage) => void;
};

export default function ChatMessageInput({
  addMessage,
  disabled,
  selectedConversationId,
}: Props): JSX.Element {
  const t = useTranslations('privateChat');

  const [message, setMessage] = useState<string>('');

  const authUser = useSelector((state: RootState) => state.authSlice.user);

  const handleChangeMessage = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
    setMessage(event.target.value);
  }, []);

  const handleSendMessage = useCallback(
    async (event: React.KeyboardEvent<HTMLInputElement>): Promise<void> => {
      if (event.key === 'Enter' && message.trim()) {
        try {
          const newMessage: IChatMessage = {
            id: uuidv4(),
            body: message,
            createdAt: new Date().toISOString(),
            isMe: true,
            sender: {
              name: `${authUser?.firstName} ${authUser?.lastName}`,
            },
            isRead: false,
          };

          addMessage(newMessage);
          setMessage('');
        } catch (error) {
          enqueueSnackbar(`${t('errMsg')}`, { variant: 'error' });
        }
      }
    },
    [message, addMessage, authUser, t]
  );

  if (!authUser) {
    return <LoadingScreen />;
  }

  return (
    <InputBase
      value={message}
      onKeyUp={handleSendMessage}
      onChange={handleChangeMessage}
      placeholder={t('placeholder')}
      disabled={disabled}
      endAdornment={
        <Stack direction="row" sx={{ flexShrink: 0 }}>
          <IconButton>
            <Iconify icon="mdi:email-send" />
          </IconButton>
        </Stack>
      }
      sx={{
        px: 2,
        height: 56,
        flexShrink: 0,
        borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
      }}
    />
  );
}
