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
import { useCreateChatMutation } from 'store/chat';

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

  const [createChat] = useCreateChatMutation();

  const handleClick = useCallback(
    ({
      firstName,
      userId,
      chatId,
      agentId,
    }: {
      firstName: string;
      userId: string;
      chatId: string | undefined;
      agentId: string;
    }) => {
      const createNewChat = async () => {
        try {
          const response = await createChat({
            title: firstName,
            memberIds: [agentId, userId],
            isPrivate: true,
          }).unwrap();

          router.push(`${AppRoute.CHATS_PAGE}/${response.chat.id}`);
        } catch (err) {
          enqueueSnackbar(t('error'), { variant: 'error' });
        }
      };

      if (!chatId) {
        createNewChat();
      } else {
        router.push(`${AppRoute.CHATS_PAGE}/${chatId}`);
      }
    },
    [router, t, createChat]
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
                onClick={() =>
                  handleClick({
                    firstName: result.firstName,
                    chatId: getChatId(result.id),
                    agentId: result.id,
                    userId: id,
                  })
                }
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
