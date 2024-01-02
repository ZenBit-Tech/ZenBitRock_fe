import { useState, useCallback, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { Container } from '@mui/system';
import Card from '@mui/material/Card';
import { useRouter } from 'routes/hooks';
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
        const results = agents.filter((agent) =>
          agent.id !== id && agent.firstName
            ? agent.firstName.toLowerCase().includes(inputValue.toLowerCase()) ||
              agent.lastName.toLowerCase().includes(inputValue.toLowerCase())
            : null
        );

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
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
          </InputAdornment>
        ),
      }}
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
        </>
      )}
    </>
  );

  return <Container>{renderContent}</Container>;
}
