'use client';

import { Box, Fab } from '@mui/material';
import { AxiosError } from 'axios';

import { useGetLeads } from 'api/lead';
import Iconify from 'components/iconify';
import { useSnackbar } from 'components/snackbar';
import { colors } from 'constants/colors';
import { useEffect, useInfinityScroll, useScrollToTop, useState, useTranslations } from 'hooks';
import { NotMatchedView } from 'sections';
import { ILeads, ILeadsPagination, ILeadsParamsList, ILead } from 'types/lead';
import { endpoints } from 'utils/axios';
import uuidv4 from 'utils/uuidv4';

import { TextStyled, ListStyled, BoxStyledWithName, LinkStyled } from './styles';
import Lead from './components/lead-item/lead-item';

const INITIAL_PARAMS: ILeadsParamsList = {
  page: 1,
  limit: 10,
};

const URL = endpoints.lead;

interface LeadsListProps {
  filter: string | undefined;
  id: string | undefined;
  name: string | undefined;
}

function LeadsList({ filter, id, name }: LeadsListProps): JSX.Element {
  const [params, setParams] = useState<ILeadsParamsList>(INITIAL_PARAMS);
  const { leads, leadsError } = useGetLeads(id ? `${URL.byProperty}${id}` : '', {
    params: { ...params, search: filter },
  });

  const [leadsList, setLeadsList] = useState<ILeads>([]);
  const [leadsPagination, setLeadsPagination] = useState<ILeadsPagination>();
  const [error, setError] = useState<AxiosError | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(true);

  const t = useTranslations('leads');
  const { enqueueSnackbar } = useSnackbar();

  const isVisible = useScrollToTop();

  const scrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useInfinityScroll({
    callback: () => {
      if (leadsPagination && leadsPagination.hasNextPage) {
        setIsFetching(true);
      }
    },
  });

  useEffect(() => {
    if (isFetching)
      (async (): Promise<void> => {
        try {
          setError(leadsError);
          if (!leadsError && leads.data) {
            setLeadsList((prev) => [...prev, ...leads.data]);
            setLeadsPagination((prev) => ({ ...prev, ...leads.pagination }));
            if (leads.pagination?.hasNextPage)
              setParams((prev) => ({ ...prev, page: prev.page + 1 }));
            setIsFetching(false);
          }
        } catch (err) {
          setError(err);
        }
      })();
  }, [isFetching, leads, leadsError, leadsPagination, filter]);

  useEffect(() => {
    setParams(INITIAL_PARAMS);
    setLeadsList([]);
    setLeadsPagination(undefined);
    setIsFetching(true);
  }, [filter]);

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
            <LinkStyled href={'/leads'} title={t('reset')}>
              <Iconify
                icon="carbon:close-outline"
                color={colors.PRIMARY_DARK_COLOR}
                width="1rem"
                height="1rem"
                sx={{
                  position: 'absolute',
                  bottom: '-0.5rem',
                  right: '-0.5rem',
                  backgroundColor: colors.PRIMARY_LIGHT_COLOR,
                }}
              />
            </LinkStyled>
          </BoxStyledWithName>
        </>
      )}

      {error && enqueueSnackbar(t('error'), { variant: 'error' })}
      {leadsList.length !== 0 && (
        <ListStyled
          sx={{
            width: '100%',
            marginX: 'auto',
          }}
        >
          {leadsList.map((lead: ILead) => (
            <Lead lead={lead} key={uuidv4()} />
          ))}
        </ListStyled>
      )}
      {(leadsList.length === 0 && filter && !isFetching) ||
        (leadsList.length === 0 && name && !isFetching && <NotMatchedView />)}
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
