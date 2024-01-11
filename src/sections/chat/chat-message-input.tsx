import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslations } from 'next-intl';
import { enqueueSnackbar } from 'notistack';
import Stack from '@mui/material/Stack';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import Iconify from 'components/iconify';
import { LoadingScreen } from 'components/loading-screen';
import { RootState } from 'store';
import { useSendMessageMutation } from 'store/chat/chat-api';

type Props = {
  disabled?: boolean;
  chatId: string;
};

export default function ChatMessageInput({ disabled, chatId }: Props): JSX.Element {
  const t = useTranslations('privateChat');

  const [sendMessageMutation] = useSendMessageMutation();

  const [message, setMessage] = useState<string>('');

  const authUser = useSelector((state: RootState) => state.authSlice.user);

  const handleChangeMessage = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
    setMessage(event.target.value);
  }, []);

  const sendMessage = useCallback(async (): Promise<void> => {
    if (message.trim()) {
      try {
        await sendMessageMutation({ chatId, content: message });
      } catch (error) {
        enqueueSnackbar(`${t('errMsg')}`, { variant: 'error' });
      }
    }
  }, [message, sendMessageMutation, chatId, t]);

  const handleKeyPress = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>): void => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
        setMessage('');
      }
    },
    [sendMessage]
  );

  const handleClick = useCallback((): void => {
    sendMessage();
    setMessage('');
  }, [sendMessage]);

  if (!authUser) {
    return <LoadingScreen />;
  }

  return (
    <InputBase
      value={message}
      multiline
      maxRows={3}
      onKeyDown={handleKeyPress}
      onChange={handleChangeMessage}
      placeholder={t('placeholder')}
      disabled={disabled}
      endAdornment={
        <Stack direction="row" sx={{ flexShrink: 0 }}>
          <IconButton onClick={handleClick}>
            <Iconify icon="mdi:email-send" />
          </IconButton>
        </Stack>
      }
      sx={{
        px: 2,
        py: 1,
        height: 'auto',
        flexShrink: 0,
        borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
      }}
    />
  );
}
