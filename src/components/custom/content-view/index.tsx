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
import { useGetContentQuery } from 'store/content';
import { toTitleCase } from 'utils';
import { ArticleList, ContentFilter, VideoList } from 'components/custom/content-view/components';

export type IContentItem = {
  id?: string;
  title: string;
  link: string;
  checked: boolean;
};

const MOCK = {
  data: [
    {
      id: '01',
      type: 'video',
      title: 'My Profile',
      link: 'https://www.youtube.com/watch?v=Gs069dndIYk',
      screenshot: 'https://pixabay.com/photos/apple-smartphone-desk-laptop-1282241/',
      checked: true,
    },
    {
      id: '02',
      type: 'video',
      title: 'My Leads',
      link: 'https://www.youtube.com/watch?v=iPRSxwZBmcM',
      screenshot: 'https://pixabay.com/photos/ipad-map-tablet-internet-screen-632394/',
      checked: false,
    },
    {
      id: '03',
      type: 'article',
      title: 'Effective Lead Management: Pro Tips for Agents',
      link: 'https://www.thebeaverton.com/2024/01/toronto-homeowners-outraged-at-50-property-tax-increase-encouraged-to-skip-avocado-toast-make-coffee-at-home/',
      screenshot: null,
      checked: true,
    },
    {
      id: '04',
      type: 'article',
      title: 'Effective Lead Management: How to change Lead status',
      link: 'https://www.thebeaverton.com/2024/01/oh-no-friend-from-high-school-debuts-5th-straight-incorrect-middle-east-take-on-facebook/',
      screenshot: null,
      checked: false,
    },
    {
      id: '05',
      type: 'article',
      title: 'Viewing matching Leads',
      link: 'https://www.thebeaverton.com/2024/01/the-9-people-that-own-all-of-torontos-real-estate-extremely-upset-about-property-tax-hike/',
      screenshot: null,
      checked: false,
    },
    {
      id: '06',
      type: 'article',
      title: 'Creating Agent Group Chat',
      link: 'https://www.thebeaverton.com/2024/01/man-with-dedicated-folder-for-back-of-the-head-selfies-definitely-not-balding/',
      screenshot: null,
      checked: false,
    },
  ],
};

function ContentView(): JSX.Element {
  const [filter, setFilter] = useState<string>('');

  const t = useTranslations('content');
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const isVisible = useScrollToTop();

  const scrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // const { data: content, error, isFetching, refetch } = useGetContentQuery();
  const { error, isFetching, refetch } = useGetContentQuery();
  const content = MOCK.data;

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
        <ContentFilter getFilter={(searchString: string) => getFilter(searchString)} t={t} />
      </Box>
      <Box sx={{ display: 'none' }}>
        {error && enqueueSnackbar(t('error'), { variant: 'error' })}
      </Box>

      <Box>
        {content && content.filter((item) => item.type === 'video').length > 0 && (
          <VideoList
            videos={content.filter((item) => item.type === 'video')}
            filter={filter}
            refetch={() => refetch()}
            t={t}
          />
        )}
        {content && content.filter((item) => item.type === 'article').length > 0 && (
          <ArticleList
            articles={content.filter((item) => item.type === 'article')}
            filter={filter}
            refetch={() => refetch()}
            t={t}
          />
        )}
      </Box>

      {content && content.length === 0 && !isFetching && <NoDataFound />}
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
