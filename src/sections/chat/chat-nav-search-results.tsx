import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';
import { UserChatResponse } from 'types/user-backend';
import { Box } from '@mui/material';
import { NoDataFound } from 'components/custom';

type Props = {
  query: string;
  results: UserChatResponse[];
  onClickResult: (result: UserChatResponse) => void;
  id: string;
};

export default function ChatNavSearchResults({
  query,
  results,
  onClickResult,
  id,
}: Props): JSX.Element {
  const t = useTranslations('agents');

  const totalResults = useMemo((): number => results.length, [results]);
  const notFound = useMemo((): boolean => !totalResults && !!query, [totalResults, query]);

  return (
    <Box sx={{ minHeight: '70vh' }}>
      <Typography
        variant="h6"
        sx={{
          px: 2.5,
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
                onClick={() => onClickResult(result)}
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
