import { Box, Typography } from '@mui/material';
import { VideoItem } from 'components/custom/content-view/components/video-item';
import { IContentItem } from 'components/custom/content-view';

function VideoList({
  videos,
  filter,
  refetch,
  t,
}: {
  videos: IContentItem[];
  filter: string;
  refetch: () => void;
  t: Function;
}): JSX.Element {
  return (
    <Box>
      <Typography>{t('videoTutorials')}</Typography>
      {videos
        .filter((video) => video.title.toLowerCase().includes(filter))
        .map(({ id, title, link, checked }) => (
          <VideoItem
            key={id}
            title={title}
            link={link}
            checked={checked}
            refetch={() => refetch()}
          />
        ))}
    </Box>
  );
}

export { VideoList };
