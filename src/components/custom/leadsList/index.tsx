'use client';

import { Box, Fab } from '@mui/material';

import Iconify from 'components/iconify';
import { useSnackbar } from 'components/snackbar';
import { colors } from 'constants/colors';
import { useInfinityScroll, useScrollToTop, useState, useTranslations } from 'hooks';
import { NotMatchedView } from 'sections';
import { useGetLeadsQuery } from 'store/api/qobrixApi';
import { QobrixLeadItem } from 'types';
import { endpoints } from 'utils/axios';
import uuidv4 from 'utils/uuidv4';

import { TextStyled, ListStyled, BoxStyledWithName, LinkStyled } from './styles';
import Lead from './components/lead-item/lead-item';

export const FIRST_PAGE: number = 1;

const URL = endpoints.lead;

interface LeadsListProps {
  filter: string | undefined;
  id: string | undefined;
  name: string | undefined;
}

function LeadsList({ filter, id, name }: LeadsListProps): JSX.Element {
  const [page, setPage] = useState(FIRST_PAGE);

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

  const { data, error, isFetching } = useGetLeadsQuery(
    { page, filter, id },
    {
      refetchOnFocus: true,
      refetchOnReconnect: true,
    }
  );

  const leadsList = data?.data;

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
      {leadsList?.length !== 0 && (
        <ListStyled
          sx={{
            width: '100%',
            marginX: 'auto',
          }}
        >
          {leadsList?.map((lead: QobrixLeadItem) => <Lead lead={lead} key={uuidv4()} />)}
        </ListStyled>
      )}
      {(leadsList?.length === 0 && filter && !isFetching) ||
        (leadsList?.length === 0 && name && !isFetching && <NotMatchedView />)}
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