import { useState, useCallback, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import TextField from '@mui/material/TextField';
import { Container } from '@mui/system';
import { Fab } from '@mui/material';
import Card from '@mui/material/Card';
import { useRouter } from 'routes/hooks';
import { useScrollToTop } from 'hooks';
import { UserChatResponse } from 'types/user-backend';
import { AppRoute } from 'enums';
import { AGENTS_SORT_OPTIONS } from 'constants/agentsSortOptions';
import { ChatNavItemSkeleton } from './chat-skeleton';
import ChatNavSearchResults from './chat-nav-search-results';
import AgentListItem from './chat-agent-item';
import AgentSort from './agent-sort';
import sortAgents from './utils/sortAgents';

type Props = {
  loading: boolean;
  agents?: UserChatResponse[];
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

  const handleClickAwaySearch = useCallback((): void => {
    setSearchAgents({
      query: '',
      results: [],
    });
  }, []);

  const handleClickResult = useCallback(
    (result: UserChatResponse): void => {
      router.push(`${AppRoute.CHAT_PAGE}/${result.id}`);
    },
    [router]
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
      onClickResult={handleClickResult}
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
      sx={{ my: 2.5 }}
    />
  );

  const renderContent = (
    <>
      <Card
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: (theme) => theme.spacing(3, 3, 3, 3),
          mb: 2,
        }}
      >
        {renderSearchInput}
      </Card>

      {searchAgents.query && renderListResults}

      {loading && renderSkeleton}

      {!searchAgents.query && (
        <>
          <AgentSort sort={sort} sortOptions={AGENTS_SORT_OPTIONS} onSort={setSort} />
          {sortedAgents?.map((agent) =>
            id !== agent.id && agent.firstName ? (
              <AgentListItem key={agent.id} agent={agent} handleClickResult={handleClickResult} />
            ) : null
          )}
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
        </>
      )}
    </>
  );

  return <Container>{renderContent}</Container>;
}
