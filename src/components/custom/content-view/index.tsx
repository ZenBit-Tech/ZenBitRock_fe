'use client';

import { Backdrop, Box, Button, CircularProgress, Fab, Typography } from '@mui/material';

import { DELAY, NoDataFound, Onboarding, useOnboardingContext } from 'components/custom';
import { LoadingScreen } from 'components/loading-screen';
import { useSnackbar } from 'components/snackbar';
import { AppRoute } from 'enums';
import { useEffect, useMount, useRouter, useScrollToTop, useState, useTranslations } from 'hooks';
import { useGetContentMutation } from 'store/content';
import { toTitleCase } from 'utils';
import { ArticleList } from './components/article-list';
import { VideoList } from './components/video-list';
import { ContentFilter } from './components';

const MOCK = {
  data: [
    {
      id: '01',
      type: 'video',
      title: 'My Profile',
      link: 'https://www.youtube.com/watch?v=Gs069dndIYk',
      screenshot: 'https://dummyimage.com/600x400/007867/black.jpg&text=Dummy+Image+1',
      checked: true,
    },
    {
      id: '02',
      type: 'video',
      title: 'My Leads',
      link: 'https://www.youtube.com/watch?v=iPRSxwZBmcM',
      screenshot: 'https://dummyimage.com/600x400/007867/black.jpg&text=Dummy+Image+2',
      checked: false,
    },
    {
      id: '03',
      type: 'article',
      title: 'Effective Lead Management: Pro Tips for Agents',
      link: 'https://www.thebeaverton.com/2024/01/toronto-homeowners-outraged-at-50-property-tax-increase-encouraged-to-skip-avocado-toast-make-coffee-at-home/',
      screenshot: undefined,
      checked: true,
    },
    {
      id: '04',
      type: 'article',
      title: 'Effective Lead Management: How to change Lead status',
      link: 'https://www.thebeaverton.com/2024/01/oh-no-friend-from-high-school-debuts-5th-straight-incorrect-middle-east-take-on-facebook/',
      screenshot: undefined,
      checked: false,
    },
    {
      id: '05',
      type: 'article',
      title: 'Viewing matching Leads',
      link: 'https://www.thebeaverton.com/2024/01/the-9-people-that-own-all-of-torontos-real-estate-extremely-upset-about-property-tax-hike/',
      screenshot: undefined,
      checked: false,
    },
    {
      id: '06',
      type: 'article',
      title: 'Creating Agent Group Chat',
      link: 'https://www.thebeaverton.com/2024/01/man-with-dedicated-folder-for-back-of-the-head-selfies-definitely-not-balding/',
      screenshot: undefined,
      checked: false,
    },
  ],
};

function ContentView(): JSX.Element {
  const [filter, setFilter] = useState<string>('');
  const [showLoader, setLoader] = useState(false);

  const t = useTranslations('content');
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const isVisible = useScrollToTop();

  const scrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  //   For mocking data - temporary commented!
  //   const [getContent, { data: content, error, isLoading }] = useGetContentMutation();
  const [getContent, { error, isLoading }] = useGetContentMutation();
  const {
    setState,
    state: { tourActive },
  } = useOnboardingContext();
  const content = MOCK.data;

  useEffect(() => {
    getContent();
  }, [getContent]);

  function getFilter(searchString: string): void {
    setFilter(searchString);
  }

  useEffect(() => {
    if (error) {
      enqueueSnackbar(t('somethingWentWrong'), { variant: 'error' });
    }
  }, [error, enqueueSnackbar, t]);

  useMount(() => {
    if (tourActive) {
      setTimeout(() => {
        setLoader(false);
        setState({ run: true, stepIndex: 16 });
      }, DELAY);
    }
  });

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        marginX: 'auto',
        transition: 'easy-in 200 display',
      }}
      className="onboarding-step-16"
    >
      {showLoader && tourActive && (
        <Backdrop open sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}>
          <CircularProgress color="primary" />
        </Backdrop>
      )}
      <Onboarding />
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
          alignItems: 'flex-start',
          gap: '1rem',
          my: '1.5rem',
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {toTitleCase(t('toQuickStartGuideText'))}
        </Typography>
        <Button
          title={t('titleGoToQSG')}
          sx={{ padding: '14px', whiteSpace: 'nowrap', minWidth: 'fit-content' }}
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
      {isLoading && (
        <LoadingScreen
          sx={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: '100',
          }}
        />
      )}
      <Box>
        {content && content.filter((item) => item.type === 'video').length > 0 && (
          <VideoList
            videos={content.filter((item) => item.type === 'video')}
            filter={filter}
            t={t}
          />
        )}
        {content && content.filter((item) => item.type === 'article').length > 0 && (
          <ArticleList
            articles={content.filter((item) => item.type === 'article')}
            filter={filter}
            t={t}
          />
        )}
      </Box>

      {content && content.length === 0 && !isLoading && <NoDataFound />}
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
