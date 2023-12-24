'use client';

import { Box, Fab } from '@mui/material';
import { LoadingScreen } from 'components/loading-screen';
import { useSnackbar } from 'components/snackbar';
import { useInfinityScroll, useScrollToTop, useState, useTranslations } from 'hooks';
import { QobrixProperty } from 'types/qobrix';
import { useGetPropertiesQuery } from 'store/api/qobrixApi';
import { ListStyled } from './styles';
import { PropertyCard } from '../propery-card/property-card';

export const FIRST_PAGE: number = 1;

type Props = {
  search: string;
};

function PropertiesList({ search }: Props): JSX.Element {
  const [page, setPage] = useState(FIRST_PAGE);

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

  const { data, error, isFetching } = useGetPropertiesQuery(
    { search, page },
    { refetchOnMountOrArgChange: true }
  );

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '90%',
        marginX: 'auto',
        transition: 'easy-in 200 display',
      }}
    >
      {error && enqueueSnackbar(t('error'), { variant: 'error' })}
      {data?.data.length !== 0 && (
        <ListStyled
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'stretch',
            flexWrap: 'wrap',
            gap: '5%',
            width: '90%',
            margin: 'auto',
          }}
        >
          {data?.data.map((item: QobrixProperty) => <PropertyCard property={item} key={item.id} />)}
        </ListStyled>
      )}
      {isFetching && !error && <LoadingScreen />}
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
