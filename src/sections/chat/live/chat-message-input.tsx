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

type Props = {
  disabled?: boolean;
  addMessage: (message: string) => void;
};

export default function ChatMessageInput({ addMessage, disabled }: Props): JSX.Element {
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
          addMessage(message);
          setMessage('');
        } catch (error) {
          enqueueSnackbar(`${t('errMsg')}`, { variant: 'error' });
        }
      }
    },
    [message, addMessage, t]
  );

  if (!authUser) {
    return <LoadingScreen sx={{ mt: 'calc(100vh / 2 - 65px)' }} />;
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
