import { Box, Card, Checkbox, Link, Typography } from '@mui/material';
import { IContentItem } from 'components/custom/content-view';
import Image from 'components/image';
import { LoadingScreen } from 'components/loading-screen';
import { useSnackbar } from 'components/snackbar';
import { useState } from 'hooks';
import { useUpdateContentCheckedMutation } from 'store/content';

interface PropsVideoItem extends IContentItem {
  idx: number;
  t: Function;
}

function VideoItem({ id, idx, title, link, screenshot, checked, t }: PropsVideoItem): JSX.Element {
  const [checkBoxValue, setCheckBoxValue] = useState<boolean>(checked);
  const { enqueueSnackbar } = useSnackbar();

  const [updateContentChecked, { isLoading }] = useUpdateContentCheckedMutation();

  async function handleChange(event: React.ChangeEvent<HTMLInputElement>): Promise<void> {
    try {
      setCheckBoxValue(!checkBoxValue);
      if (id) {
        await updateContentChecked({ id, checked: event.target.checked }).unwrap();
      }
    } catch (error) {
      enqueueSnackbar(`${t('somethingWentWrong')}: ${error.data.message}`, {
        variant: 'error',
      });
    }
  }

  return (
    <Link
      href={link}
      target="_blank"
      rel="noopener"
      title={title}
      onClick={(event) => {
        console.log(event.currentTarget);
      }}
    >
      <Card
        sx={{ p: '0.5rem', position: 'relative', mb: '1rem', '&:last-child': { mb: '1.5rem' } }}
      >
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
          <Box sx={{ flex: 4, py: '0.5rem' }}>
            <Box sx={{ display: 'flex', gap: '0.375rem', alignItems: 'baseline', mb: '0.5rem' }}>
              <Typography variant="subtitle2">{t('lesson')}</Typography>
              <Typography variant="subtitle2">{idx + 1}:</Typography>
            </Box>
            <Typography variant="subtitle2">{title}</Typography>
          </Box>
          <Box sx={{ flex: 4 }}>
            <Image
              src={screenshot}
              width="100%"
              alt={`Screenshot of ${link}`}
              sx={{ objectFit: 'contain' }}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Checkbox checked={checkBoxValue} onChange={(event) => handleChange(event)} />
          </Box>
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
      </Card>
    </Link>
  );
}

export { VideoItem };
