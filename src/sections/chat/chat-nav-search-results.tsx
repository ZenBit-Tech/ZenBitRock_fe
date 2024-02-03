import { useCallback, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';
import { UserChatResponse } from 'types/user-backend';
import { Box } from '@mui/material';
import { NoDataFound } from 'components/custom';
import { enqueueSnackbar } from 'notistack';
import { useRouter } from 'hooks';
import { AppRoute } from 'enums';
import { useCheckPrivateChatMutation } from 'store/chat';

type Props = {
  query: string;
  results: UserChatResponse[];
  id: string;
  getChatId: (agentId: string) => string | undefined;
};

export default function ChatNavSearchResults({
  query,
  results,
  id,
  getChatId,
}: Props): JSX.Element {
  const t = useTranslations('agents');
  const router = useRouter();

  const totalResults = useMemo((): number => results.length, [results]);
  const notFound = useMemo((): boolean => !totalResults && !!query, [totalResults, query]);

  const [checkPrivateChat] = useCheckPrivateChatMutation();

  const handleClick = useCallback(
    async (agentId: string) => {
      try {
        const response = await checkPrivateChat(agentId).unwrap();

        router.push(`${AppRoute.CHATS_PAGE}/${response.chatId}`);
      } catch (err) {
        enqueueSnackbar(t('error'), { variant: 'error' });
      }
    },
    [router, t]
  );

  return (
    <Box sx={{ minHeight: '70vh' }}>
      <Typography
        variant="h6"
        sx={{
          px: 2.5,
          mt: 1,
          mb: 2,
        }}
      >
        {t('agents')} ({totalResults})
      </Typography>

      {notFound ? (
        <NoDataFound />
      ) : (
        <>
          {results.map((result) =>
            id !== result.id ? (
              <ListItemButton
                key={result.id}
                onClick={() => handleClick(result.id)}
                sx={{
                  px: 2.5,
                  py: 1.5,
                  typography: 'subtitle2',
                }}
              >
                <Avatar alt={result.lastName} src={result.avatarUrl} sx={{ mr: 2 }} />
                {`${result.firstName} ${result.lastName}`}
              </ListItemButton>
            ) : null
          )}
        </>
      )}
    </Box>
  );
}
