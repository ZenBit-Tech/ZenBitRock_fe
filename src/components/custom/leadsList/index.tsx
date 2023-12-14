'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { useTranslations } from 'next-intl';

import { Box, Card, Fab } from '@mui/material';
import { AxiosError } from 'axios';

import { useGetLeads } from 'api/lead';
import { useSnackbar } from 'components/snackbar';
import { colors } from 'constants/colors';
import { ILeads, ILeadsPagination, ILeadsParamsList, ILead } from 'types/lead';
import { endpoints } from 'utils/axios';

import useInfinityScroll from '../propertiesList/hooks/useInfinityScroll';
import useScrollToTop from '../propertiesList/hooks/useScrollToTop';

import { TextStyled, ListStyled } from './styles';

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
  const { leads, leadsError } = useGetLeads(id ? `${URL.byProperty}${id}` : '', { params });

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
              if (filter) {
                setParams((prev) => ({ ...prev, page: prev.page + 1, search: filter }));
              } else {
                setParams((prev) => ({ ...prev, page: prev.page + 1 }));
              }
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
        width: '100%',
        marginX: 'auto',
        transition: 'easy-in 200 display',
      }}
    >
      {name && (
        <Box
          sx={{
            width: 'fit-content',
            height: 'auto',
            borderColor: colors.PRIMARY_DARK_COLOR,
            borderStyle: 'solid',
            borderWidth: '1px',
            borderRadius: '0.375rem',
            padding: '0.375rem',
          }}
        >
          <TextStyled
            sx={{
              fontWeight: 'bold',
            }}
          >
            <span>{t('filtered')}</span>
            {name}
          </TextStyled>
        </Box>
      )}

      {error && enqueueSnackbar(t('error'), { variant: 'error' })}
      {leadsList.length !== 0 && (
        <ListStyled
          sx={{
            width: '100%',
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
                  width: '100%',
                  marginBottom: '2rem',
                  padding: '1rem',
                  paddingLeft: '3rem',
                  cursor: 'pointer',
                }}
                onClick={() => router.push(`${URL.details}/${leadId}`)}
              >
                <Box
                  sx={{
                    width: '100%',
                    height: '50%',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'baseline',
                      gap: '2rem',
                      marginBottom: '1.5rem',
                    }}
                  >
                    <TextStyled
                      sx={{
                        fontWeight: 'bold',
                        width: '3rem',
                      }}
                    >
                      {t('source')}:
                    </TextStyled>
                    <TextStyled
                      sx={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                      }}
                    >
                      {t(source)}
                    </TextStyled>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      gap: '2rem',
                      marginBottom: '1rem',
                    }}
                  >
                    <TextStyled
                      sx={{
                        fontWeight: 'bold',
                        width: '3rem',
                      }}
                    >
                      {t('status')}:
                    </TextStyled>
                    <TextStyled>{t(status)}</TextStyled>{' '}
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      gap: '2rem',
                      marginBottom: '1rem',
                    }}
                  >
                    <TextStyled
                      sx={{
                        fontWeight: 'bold',
                        width: '3rem',
                      }}
                    >
                      {t('contact')}:
                    </TextStyled>
                    <TextStyled>{contactName}</TextStyled>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      gap: '2rem',
                      marginBottom: '1rem',
                    }}
                  >
                    <TextStyled
                      sx={{
                        fontWeight: 'bold',
                        width: '3rem',
                      }}
                    >
                      {contactPhone ? t('phone') : t('email')}:
                    </TextStyled>
                    <TextStyled>{contactPhone ? contactPhone : contactEmail}</TextStyled>
                  </Box>
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
