import { Box, Card, Checkbox, Link, Typography } from '@mui/material';
import { IContentItem } from 'components/custom/content-view';
import Image from 'components/image';

interface PropsVideoItem extends IContentItem {
  refetch: () => void;
  idx: number;
  t: Function;
}

function VideoItem({
  idx,
  title,
  link,
  screenshot,
  checked,
  refetch,
  t,
}: PropsVideoItem): JSX.Element {
  return (
    <Link href={link} target="_blank" rel="noopener" title={title}>
      <Card>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', mb: '1rem' }}>
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', gap: '0.375rem', alignItems: 'baseline', mb: '0.5rem' }}>
              <Typography>{t('lesson')}</Typography>
              <Typography>{idx + 1}</Typography>
            </Box>
            <Typography>{title}</Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Image src={screenshot} width="100%" alt={`Screenshot of ${link}`} />
          </Box>
          <Box>
            <Checkbox checked={checked} />
          </Box>
        </Box>
      </Card>
    </Link>
  );
}

export { VideoItem };
