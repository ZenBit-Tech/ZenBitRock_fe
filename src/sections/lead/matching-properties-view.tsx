import { QobrixLead, QobrixProperty } from 'types';
import { useGetMatchingPropertiesQuery } from 'store/lead';
import { useEffect, useInfinityScroll, useState } from 'hooks';
import { LoadingScreen } from 'components/loading-screen';
import { Box, List, Stack, Typography } from '@mui/material';
import { PropertyCard } from 'components/custom';
import { getPropertySearchFilter } from './helpers';

type Props = {
  lead: QobrixLead;
  setMatchingPropertiesCount: (count: number) => void;
};
const MatchingPropertiesView = ({ lead, setMatchingPropertiesCount }: Props) => {
  const [page, setPage] = useState(1);
  const propertyFilter = getPropertySearchFilter(lead);

  const { data, error, isFetching } = useGetMatchingPropertiesQuery(
    { search: propertyFilter, page },
    { skip: !lead }
  );

  useEffect(() => {
    if (data) {
      setMatchingPropertiesCount(data.pagination.count);
    }
  }, [data, setMatchingPropertiesCount]);

  useInfinityScroll({
    callback: () => {
      if (!isFetching && data?.pagination.has_next_page) {
        setPage(page + 1);
      }
    },
  });

  if (!data || error) {
    return <LoadingScreen />;
  }
  return (
    <>
      {data.pagination.count > 0 && (
        <Box sx={{ m: 1, p: 1, border: '1px solid black', paddingBottom: '56px' }}>
          <Stack spacing={1}>
            <Typography variant="h4" color="text.secondary">
              Matching Properties
            </Typography>
            <List
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '5%',
                marginX: 'auto',
              }}
            >
              {data.data.map((item: QobrixProperty) => (
                <PropertyCard property={item} key={item.id} />
              ))}
            </List>
          </Stack>
        </Box>
      )}
    </>
  );
};

export { MatchingPropertiesView };
