import useTheme from '@mui/system/useTheme';
import { Stack, Typography } from '@mui/material';
import { CustomLink } from 'components/custom';
import { useTranslations } from 'hooks';
import { AppRoute } from 'enums';

type Props = {
  chatId: string;
  chatTitle?: string;
};

export default function ChatGroupHeader({ chatId, chatTitle }: Props): JSX.Element {
  const tChat = useTranslations('chat');
  const theme = useTheme();

  return (
    <>
      <Stack flexGrow={1} direction="row" alignItems="center" spacing={2}>
        <Typography>{chatTitle ? chatTitle : tChat('groupChat')}</Typography>
        <CustomLink
          color={theme.palette.primary.main}
          href={`${AppRoute.CHATS_PAGE}/${chatId}/info`}
        >
          <Typography>{` ( ${tChat('info')} )`}</Typography>
        </CustomLink>
      </Stack>

      <Stack flexGrow={1} />
    </>
  );
}
