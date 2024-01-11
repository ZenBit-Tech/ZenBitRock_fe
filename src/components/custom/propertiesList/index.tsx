'use client';

import { Box, Fab, Typography } from '@mui/material';
import { LoadingScreen } from 'components/loading-screen';
import { useSnackbar } from 'components/snackbar';
import { useEffect, useInfinityScroll, useScrollToTop, useState, useTranslations } from 'hooks';
import { QobrixProperty } from 'types/qobrix';
import { useGetPropertiesQuery } from 'store/api/qobrixApi';
import { ListStyled } from 'components/custom/propertiesList/styles';
import { PropertyCard } from 'components/custom/propery-card/property-card';
import { NoDataFound } from '../no-data-found/no-data-found';

export const FIRST_PAGE: number = 1;

type Props = {
  search: string;
};

function PropertiesList({ search }: Props): JSX.Element {
  const [page, setPage] = useState<number>(FIRST_PAGE);
  const [filter, setfilter] = useState<string>(search);

  const t = useTranslations('properties');

  const { enqueueSnackbar } = useSnackbar();

  const isVisible = useScrollToTop();

  const scrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useInfinityScroll({
    callback: (): void => {
      if (!isFetching && data?.pagination.has_next_page) {
        setPage(page + 1);
      }
    },
  });

  useEffect(() => {
    setfilter(search);
    setPage(1);
  }, [search]);

  const { data, error, isFetching } = useGetPropertiesQuery(
    { search: filter, page },
    { refetchOnMountOrArgChange: true }
  );

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        marginX: 'auto',
        transition: 'easy-in 200 display',
      }}
    >
      {error && enqueueSnackbar(t('error'), { variant: 'error' })}
      {data?.data.length === 0 && <NoDataFound />}

      {data?.data.length !== 0 && (
        <ListStyled
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'stretch',
            flexWrap: 'wrap',
            width: '90%',
            mx: 'auto',
            mt: '2rem',
            mb: '100px',
            p: '0',
          }}
        >
          <Typography variant="h5" sx={{ paddingBottom: 1 }}>{`${t('results')} ${
            data?.pagination.count ?? 0
          }`}</Typography>
          {data?.data.map((item: QobrixProperty) => <PropertyCard property={item} key={item.id} />)}
          {isFetching && <LoadingScreen />}
        </ListStyled>
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
    </Box>
  );
}

export default PropertiesList;
