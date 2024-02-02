import { useScrollToTop, useTranslations, useState, useCallback, useMemo, useEffect } from 'hooks';
import { enqueueSnackbar } from 'notistack';
import { Container } from '@mui/system';
import { Fab, TextField } from '@mui/material';
import { useRouter } from 'routes/hooks';
import { useCheckPrivateChatQuery, useCreateChatMutation } from 'store/chat';
import { UserChatResponse } from 'types/user-backend';
import { AppRoute } from 'enums';
import { AGENTS_SORT_OPTIONS } from 'constants/agentsSortOptions';
import { useGetChatsQuery } from 'store/chat/chat-api';
import { ChatNavItemSkeleton } from './chat-skeleton';
import ChatNavSearchResults from './chat-nav-search-results';
import AgentListItem from './chat-agent-item';
import AgentSort from './agent-sort';
import sortAgents from './utils/sortAgents';

type Props = {
  loading: boolean;
  agents: UserChatResponse[];
  id: string;
};

export default function ChatNav({ loading, agents, id }: Props): JSX.Element {
  const router = useRouter();

  const t = useTranslations('agents');

  const isVisible = useScrollToTop();

  const [searchAgents, setSearchAgents] = useState<{
    query: string;
    results: UserChatResponse[];
  }>({
    query: '',
    results: [],
  });

  const [sort, setSort] = useState<string>('nameAsc');
  const [selectedAgent, setSelectedAgent] = useState<UserChatResponse | null>(null);

  const { data: chats } = useGetChatsQuery({
    page: 1,
    limit: 100,
    sortType: '',
    searchParam: '',
  });

  const getChatId = (agentId: string): string | undefined => {
    let chatId;

    if (
      chats &&
      chats
        ?.filter((chat) => chat.isPrivate)
        .some((chat) => chat.members.some((member) => member.id === agentId))
    ) {
      chatId = chats
        ?.filter((chat) => chat.isPrivate)
        .find((chat) => chat.members.some((member) => member.id === agentId))?.id;
    }

    return chatId;
  };

  const { data: chatData } = useCheckPrivateChatQuery(selectedAgent?.id ?? '', {
    refetchOnMountOrArgChange: true,
  });

  const [createChat, { error }] = useCreateChatMutation();

  useEffect(() => {
    const createNewChat = async () => {
      try {
        if (selectedAgent) {
          const response = await createChat({
            title: selectedAgent.firstName,
            memberIds: [selectedAgent.id, id],
            isPrivate: true,
          }).unwrap();

          router.push(`${AppRoute.CHATS_PAGE}/${response.chat.id}`);
        }
      } catch (err) {
        enqueueSnackbar(t('error'), { variant: 'error' });
      }
    };

    if (error) {
      enqueueSnackbar(t('error'), { variant: 'error' });
    }
    if (chatData && chatData.chatId === null && selectedAgent) {
      createNewChat();
    } else if (chatData && chatData.chatId) {
      router.push(`${AppRoute.CHATS_PAGE}/${chatData.chatId}`);
    }
  }, [selectedAgent, chatData, createChat, router, t, id, error]);

  const handleSearchAgents = useCallback(
    (inputValue: string): void => {
      setSearchAgents((prevState) => ({
        ...prevState,
        query: inputValue,
      }));

      if (inputValue && agents) {
        const results = agents.filter((agent) => {
          if (agent.id !== id && agent.firstName) {
            const agentName = `${agent.firstName} ${agent.lastName}`;

            return agentName.toLowerCase().includes(inputValue.trim().toLowerCase());
          }

          return null;
        });

        setSearchAgents((prevState) => ({
          ...prevState,
          results,
        }));
      }
    },
    [agents, id]
  );

  const sortedAgents = useMemo<UserChatResponse[] | undefined>(
    () =>
      sortAgents({
        agents,
        sortType: sort,
      }),
    [agents, sort]
  );

  const scrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderSkeleton = (
    <>
      {[...Array(12)].map((_, index) => (
        <ChatNavItemSkeleton key={index} />
      ))}
    </>
  );

  const renderListResults = (
    <ChatNavSearchResults
      query={searchAgents.query}
      results={searchAgents.results}
      getChatId={getChatId}
      id={id}
    />
  );

  const renderSearchInput = (
    <TextField
      fullWidth
      value={searchAgents.query}
      onChange={(event) => handleSearchAgents(event.target.value)}
      placeholder={t('searchPlaceholder')}
      type="search"
      sx={{ mt: 2.5 }}
    />
  );

  const renderContent = (
    <>
      {renderSearchInput}

      {searchAgents.query && renderListResults}

      {loading && renderSkeleton}

      {!searchAgents.query && (
        <>
          <AgentSort sort={sort} sortOptions={AGENTS_SORT_OPTIONS} onSort={setSort} />
          {sortedAgents?.map((agent, idx) =>
            id !== agent.id && agent.firstName ? (
              <AgentListItem
                key={agent.id}
                agent={agent}
                userId={id}
                chatId={getChatId(agent.id)}
                className={idx === 0 ? 'onboarding-step-10' : ''}
              />
            ) : null
          )}
        </>
      )}
    </>
  );

  return (
    <Container sx={{ p: 0 }}>
      {renderContent}
      <Fab
        color="primary"
        aria-label="scroll to top"
        onClick={scrollToTop}
        sx={{
          position: 'fixed',
          bottom: '70px',
          right: '20px',
          display: isVisible ? 'block' : 'none',
          transition: 'easy-in 200 display',
        }}
      >
        ↑
      </Fab>
    </Container>
  );
}
