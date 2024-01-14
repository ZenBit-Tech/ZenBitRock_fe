'use client';

import { Box, Button, Fab, Typography } from '@mui/material';

import { NoDataFound } from 'components/custom';
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
import {
  useEffect,
  useInfinityScroll,
  useRouter,
  useScrollToTop,
  useState,
  useTranslations,
} from 'hooks';
import { useGetContentQuery } from 'store/api/content-api';
import { QobrixLeadItem } from 'types';
import { toTitleCase } from 'utils';
import uuidv4 from 'utils/uuidv4';
import { ArticleList, ContentFilter, VideoList } from 'components/custom/content-view/components';

export type IContentItem = {
  id?: string;
  title: string;
  link: string;
  checked: boolean;
};

function ContentView(): JSX.Element {
  const [filter, setFilter] = useState<string | undefined>(undefined);

  const t = useTranslations('leads');
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const isVisible = useScrollToTop();

  const scrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const { content, error, isFetching, refetch } = useGetContentQuery({
    refetchOnMountOrArgChange: true,
  });

  function getFilter(searchString: string): void {
    setFilter(searchString);
  }

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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: '1.5rem',
          mb: '1.5rem',
        }}
      >
        <Typography variant="h3">{toTitleCase(t('content'))}</Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: '1.5rem',
          mb: '1.5rem',
        }}
      >
        <Typography variant="subtitle1">{toTitleCase(t('toQuickStartGuideText'))}</Typography>
        <Button
          title={t('titleGoToQSG')}
          sx={{ padding: '14px' }}
          variant="contained"
          color="primary"
          type="button"
          onClick={() => router.push(`${AppRoute.QUICK_START_GUIDE_PAGE}`)}
        >
          {t('titleGoToQSG')}
        </Button>
      </Box>

      <Box
        sx={{
          mb: '1.5rem',
        }}
      >
        <ContentFilter getFilter={(searchString: string) => getFilter(searchString)} />
      </Box>
      <Box sx={{ display: 'none' }}>
        {error && enqueueSnackbar(t('error'), { variant: 'error' })}
      </Box>

      <Box>
        <VideoList
          videos={content.filter((item) => item.type === 'video')}
          filter={filter}
          refetch={() => refetch()}
        />
        <ArticleList
          articles={content.filter((item) => item.type === 'article')}
          filter={filter}
          refetch={() => refetch()}
        />
      </Box>

      {content.length === 0 && !isFetching && <NoDataFound />}
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

export default ContentView;
