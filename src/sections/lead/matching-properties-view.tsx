'use client';

import { QobrixLead, QobrixProperty } from 'types';
import { useGetMatchingPropertiesQuery } from 'store/lead';
import { useEffect, useInfinityScroll, useState } from 'hooks';
import { LoadingScreen } from 'components/loading-screen';
import { Box, List, Stack, Typography, useTheme } from '@mui/material';
import { PropertyCard } from 'components/custom';
import { getPropertySearchFilter } from 'utils';

type Props = {
  lead: QobrixLead;
  setMatchingPropertiesCount: (count: number) => void;
};
const MatchingPropertiesView = ({ lead, setMatchingPropertiesCount }: Props) => {
  const [page, setPage] = useState(1);
  const theme = useTheme();
  const propertyFilter = getPropertySearchFilter(lead);

  const { data, error, isFetching } = useGetMatchingPropertiesQuery(
    { search: propertyFilter, page, leadId: lead.id },
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
        <Box
          sx={{
            m: 1,
            p: 1,
            border: `1px solid ${theme.palette.primary.main}`,
            paddingBottom: '56px',
            borderRadius: '8px',
          }}
        >
          <Stack spacing={1}>
            <Typography variant="h4" color="text.secondary">
              Matching Properties
            </Typography>
            <List
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'stretch',
                flexWrap: 'wrap',
                gap: '5%',
                marginX: 'auto',
              }}
            >
              {data.data.map((item: QobrixProperty) => (
                <PropertyCard className="" property={item} key={item.id} />
              ))}
            </List>
          </Stack>
        </Box>
      )}
    </>
  );
};

export { MatchingPropertiesView };
