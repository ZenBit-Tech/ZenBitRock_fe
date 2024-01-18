'use client';

import { Box, Fab, Typography } from '@mui/material';

import { NoDataFound, leadMockData } from 'components/custom';
import ButtonClose from 'components/custom/button-close/button-close';
import { Lead } from 'components/custom/leadsList/components';
import {
  TextStyled,
  ListStyled,
  BoxStyledWithName,
  LinkStyled,
} from 'components/custom/leadsList/styles';
import { LoadingScreen } from 'components/loading-screen';
import { useSnackbar } from 'components/snackbar';
import { colors } from 'constants/colors';
import { AppRoute } from 'enums';
import { useEffect, useInfinityScroll, useScrollToTop, useState, useTranslations } from 'hooks';
import { useGetLeadsQuery, useGetPropertyTypesQuery } from 'store/api/qobrixApi';
import { QobrixLeadItem } from 'types';
import uuidv4 from 'utils/uuidv4';

export const FIRST_PAGE: number = 1;

interface LeadsListProps {
  filter: string | undefined;
  id: string | undefined;
  name: string | undefined;
  tourActive: boolean;
}

function LeadsList({ filter, id, name, tourActive }: LeadsListProps): JSX.Element {
  const [page, setPage] = useState(FIRST_PAGE);
  const [localFilter, setLocalFilter] = useState<string | undefined>(
    window.localStorage.getItem('leadsFilter')
      ? (window.localStorage.getItem('leadsFilter') as string)
      : undefined
  );

  const t = useTranslations('leads');
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
  const { data: types, isLoading } = useGetPropertyTypesQuery(undefined);

  const { data, error, isFetching, refetch } = useGetLeadsQuery(
    { page, filter: localFilter, id },
    { refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    if (window.localStorage.getItem('leadsFilter')) {
      refetch();
    }
  }, [refetch]);

  useEffect(() => {
    if (filter?.includes('firstcall')) {
      setPage(FIRST_PAGE);
      setLocalFilter(filter?.split('firstcall')[1]);
    } else if (filter === 'update') {
      setPage(FIRST_PAGE);
      setLocalFilter(filter);
    }
  }, [filter]);

  const leadsList = tourActive ? leadMockData?.data : data?.data;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        marginX: 'auto',
        transition: 'easy-in 200 display',
      }}
    >
      {name && (
        <>
          <TextStyled
            sx={{
              fontWeight: 'bold',
            }}
          >
            {t('filtered')}
          </TextStyled>
          <BoxStyledWithName>
            <TextStyled>{name}</TextStyled>
            <LinkStyled href={AppRoute.LEADS_PAGE} title={t('reset')}>
              <ButtonClose
                bottom="-0.5rem"
                right="-0.5rem"
                width="1rem"
                height="1rem"
                backgroundColor={colors.PRIMARY_LIGHT_COLOR}
              />
            </LinkStyled>
          </BoxStyledWithName>
        </>
      )}
      <Box sx={{ display: 'none' }}>
        {error && enqueueSnackbar(t('error'), { variant: 'error' })}
      </Box>
      {leadsList?.length !== 0 && (
        <ListStyled
          sx={{
            width: '100%',
            marginX: 'auto',
            mb: '50px',
          }}
        >
          {localFilter &&
            leadsList?.length !== 0 &&
            localFilter !== 'update' &&
            data?.pagination && (
              <Typography variant="h5" sx={{ paddingBottom: 2 }} textAlign="center">
                {` ${t('results')}: ${data.pagination.count}`}
              </Typography>
            )}
          {leadsList?.map((lead: QobrixLeadItem, idx) => (
            <Lead
              className={idx === 0 ? 'onboarding-step-7' : ''}
              lead={lead}
              type={
                types && types.data && types.data.find((type) => type.code === lead.lookingFor)
                  ? types.data.find((type) => type.code === lead.lookingFor)?.name
                  : undefined
              }
              key={uuidv4()}
            />
          ))}
          {isFetching && isLoading && <LoadingScreen />}
        </ListStyled>
      )}
      {leadsList?.length === 0 && (localFilter || name) && !isFetching && !isLoading && (
        <NoDataFound />
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

export default LeadsList;
