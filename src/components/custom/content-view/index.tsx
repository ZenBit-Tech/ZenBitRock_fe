'use client';

import { Backdrop, Box, Button, CircularProgress, Fab, Typography } from '@mui/material';

import { DELAY, NoDataFound, Onboarding, useOnboardingContext } from 'components/custom';
import { LoadingScreen } from 'components/loading-screen';
import { useSnackbar } from 'components/snackbar';
import { AppRoute } from 'enums';
import { useEffect, useMount, useRouter, useScrollToTop, useState, useTranslations } from 'hooks';
import { toTitleCase } from 'utils';
import { useGetContentQuery } from 'store/content/content-api';
import { ContentList } from './components/content-list';
import { ContentFilter } from './components';

function ContentView(): JSX.Element {
  const [filter, setFilter] = useState<string>('');
  const [showLoader, setLoader] = useState<boolean>(false);

  const t = useTranslations('content');
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const isVisible = useScrollToTop();

  const scrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const { data: content, error, isLoading } = useGetContentQuery();

  const {
    setState,
    state: { tourActive },
  } = useOnboardingContext();

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
        setState({ run: true, stepIndex: 15 });
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
          <ContentList
            contents={content.filter((item) => item.type === 'video')}
            filter={filter}
            t={t}
            type="video"
          />
        )}
        {content && content.filter((item) => item.type === 'article').length > 0 && (
          <ContentList
            contents={content.filter((item) => item.type === 'article')}
            filter={filter}
            t={t}
            type="article"
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
