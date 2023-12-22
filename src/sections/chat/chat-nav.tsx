import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslations } from 'next-intl';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { Container } from '@mui/system';
import Card from '@mui/material/Card';
import { useRouter } from 'routes/hooks';
import Iconify from 'components/iconify';
import { UserChatResponse } from 'types/user-backend';
import { AppRoute } from 'enums';
import { RootState } from 'store';
import { LoadingScreen } from 'components/loading-screen';
import { ChatNavItemSkeleton } from './chat-skeleton';
import ChatNavSearchResults from './chat-nav-search-results';
import AgentListItem from './chat-agent-item';

type Props = {
  loading: boolean;
  agents?: UserChatResponse[];
};

export default function ChatNav({ loading, agents }: Props): JSX.Element {
  const router = useRouter();

  const t = useTranslations('agents');

  const [searchAgents, setSearchAgents] = useState<{
    query: string;
    results: UserChatResponse[];
  }>({
    query: '',
    results: [],
  });

  const handleSearchAgents = useCallback(
    (inputValue: string): void => {
      setSearchAgents((prevState) => ({
        ...prevState,
        query: inputValue,
      }));

      if (inputValue && agents) {
        const results = agents.filter(
          (agent) =>
            agent.firstName.toLowerCase().includes(inputValue.toLowerCase()) ||
            agent.lastName.toLowerCase().includes(inputValue.toLowerCase())
        );

        setSearchAgents((prevState) => ({
          ...prevState,
          results,
        }));
      }
    },
    [agents]
  );

  const handleClickAwaySearch = useCallback((): void => {
    setSearchAgents({
      query: '',
      results: [],
    });
  }, []);

  const handleClickResult = useCallback(
    (result: UserChatResponse): void => {
      handleClickAwaySearch();
      router.push(`${AppRoute.CHAT_PAGE}/${result.id}`);
    },
    [handleClickAwaySearch, router]
  );

  const authUser = useSelector((state: RootState) => state.authSlice.user);

  if (!authUser) {
    return <LoadingScreen />;
  }
  const { id } = authUser;

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
    />
  );

  const renderSearchInput = (
    <ClickAwayListener onClickAway={handleClickAwaySearch}>
      <TextField
        fullWidth
        value={searchAgents.query}
        onChange={(event) => handleSearchAgents(event.target.value)}
        placeholder={t('searchPlaceholder')}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          ),
        }}
        sx={{ my: 2.5 }}
      />
    </ClickAwayListener>
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

      {!searchAgents.query &&
        agents?.map((agent) =>
          id !== agent.id ? (
            <AgentListItem key={agent.id} agent={agent} handleClickResult={handleClickResult} />
          ) : null
        )}
    </>
  );

  return <Container>{renderContent}</Container>;
}
