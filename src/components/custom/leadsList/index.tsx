'use client';

import { Box, Card, Fab } from '@mui/material';

import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useGetLeads } from 'api/lead';
import { useSnackbar } from 'components/snackbar';
import { ILeads, ILeadsPagination, ILeadsParamsList, ILead } from 'types/lead';
import useInfinityScroll from './hooks/useInfinityScroll';
import useScrollToTop from './hooks/useScrollToTop';
import {
  TypographyStyled,
  LinkStyled,
  TextStyled,
  ListStyled,
  BoxStyled,
  TextMiddleStyled,
  CardMediaStyled,
} from './styles';

const INITIAL_PARAMS: ILeadsParamsList = {
  page: 1,
  limit: 10,
};

interface LeadsListProps {
  filter: string | undefined;
  id: string | undefined;
  name: string | undefined;
}

function LeadsList({ filter, id, name }: LeadsListProps): JSX.Element {
  const [params, setParams] = useState<ILeadsParamsList>(INITIAL_PARAMS);
  const { leads, leadsError } = useGetLeads(id ? `/by-property/${id}` : '', { params });

  const [leadsList, setLeadsList] = useState<ILeads>([]);
  const [leadsPagination, setLeadsPagination] = useState<ILeadsPagination>();
  const [error, setError] = useState<AxiosError | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(true);

  const t = useTranslations('leads');
  const router = useRouter();
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
              setParams((prev) => ({ ...prev, page: prev.page + 1, filter: filter && filter }));
            setIsFetching(false);
          }
        } catch (err) {
          setError(err);
        }
      })();
  }, [isFetching, leads, leadsError, leadsPagination, filter]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '90%',
        marginX: 'auto',
        transition: 'easy-in 200 all',
      }}
    >
      {name && (
        <Box
          sx={{
            width: '100%',
            height: '50%',
          }}
        >
          <TextStyled
            sx={{
              fontWeight: 'bold',
            }}
          >
            {name}
          </TextStyled>
        </Box>
      )}

      {error && enqueueSnackbar(t('error'), { variant: 'error' })}
      {leadsList.length !== 0 && (
        <ListStyled
          sx={{
            width: '90%',
            marginX: 'auto',
          }}
        >
          {leadsList.map((item: ILead) => {
            const { leadId, status, source, contactName, contactEmail, contactId, contactPhone } =
              item;

            return (
              <Card
                key={`${leadId}${contactId}`}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  width: '90%',
                  marginBottom: '2rem',
                  cursor: 'pointer',
                }}
                onClick={() => router.push(`/leads/lead/${leadId}`)}
              >
                <Box
                  sx={{
                    width: '100%',
                    height: '50%',
                  }}
                >
                  <TextStyled
                    sx={{
                      fontWeight: 'bold',
                    }}
                  >
                    {t(source)}
                  </TextStyled>

                  <TextStyled
                    sx={{
                      fontWeight: 'bold',
                    }}
                  >
                    {t(status)}
                  </TextStyled>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignContent: 'space-between',
                    flexDirection: 'column',
                    padding: '1rem',
                    width: '100%',
                    height: '50%',
                    maxHeight: '50%',
                    minHeight: '50%',
                  }}
                >
                  <BoxStyled
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '100%',
                    }}
                  >
                    <TextStyled
                      sx={{
                        fontWeight: 'bold',
                      }}
                    >
                      {contactName}
                    </TextStyled>
                    <TextStyled
                      sx={{
                        fontWeight: 'bold',
                      }}
                    >
                      {contactEmail}
                    </TextStyled>
                  </BoxStyled>
                  <TextMiddleStyled>{contactPhone}</TextMiddleStyled>
                </Box>
              </Card>
            );
          })}
        </ListStyled>
      )}
      <Fab
        color="primary"
        aria-label="scroll to top"
        onClick={scrollToTop}
        sx={{
          position: 'fixed',
          bottom: '50px',
          right: '20px',
          display: isVisible ? 'block' : 'none',
          transition: 'easy-in 200 all',
        }}
      >
        ↑
      </Fab>
    </Box>
  );
}

export default LeadsList;
