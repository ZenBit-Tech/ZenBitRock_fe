import { Box, Typography } from '@mui/material';
import { VideoItem } from 'components/custom/content-view/components/video-item';
import { IContentItem } from 'components/custom/content-view';

function VideoList({
  videos,
  filter,
  t,
}: {
  videos: IContentItem[];
  filter: string;
  t: Function;
}): JSX.Element {
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          mb: '1.5rem',
        }}
      >
        <Typography variant="h4" sx={{ flex: 5 }}>
          {t('videoTutorials')}
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{ textDecoration: 'underline', flex: 1, textAlign: 'right' }}
        >
          {t('viewed')}
        </Typography>
      </Box>

      {videos
        .filter((video) => video.title.toLowerCase().includes(filter))
        .map(({ id, title, link, screenshot, checked }, idx) => (
          <VideoItem
            id={id}
            idx={idx}
            key={id}
            title={title}
            link={link}
            screenshot={screenshot}
            checked={checked}
            t={t}
          />
        ))}
    </Box>
  );
}

export { VideoList };
