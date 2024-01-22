import { Box, Card, Checkbox, Link, Typography } from '@mui/material';
import Image from 'components/image';
import { useSnackbar } from 'components/snackbar';
import { useState } from 'hooks';
import { useUpdateContentCheckedMutation } from 'store/content';
import { IContentItem } from 'types';

interface PropsArticleItem extends IContentItem {
  t: Function;
}

function ArticleItem({ id, title, link, screenshot, checked, t }: PropsArticleItem): JSX.Element {
  const [checkBoxValue, setCheckBoxValue] = useState<boolean>(checked);
  const { enqueueSnackbar } = useSnackbar();

  const [updateContentChecked] = useUpdateContentCheckedMutation();

  async function handleChange(
    event: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ): Promise<void> {
    try {
      if (id) {
        if ((event.target as HTMLElement).nodeName !== 'INPUT') {
          if (checkBoxValue) {
            return;
          }
          setCheckBoxValue(true);
          await updateContentChecked({
            id,
            checked: true,
          }).unwrap();
        } else {
          setCheckBoxValue(!checkBoxValue);
          await updateContentChecked({
            id,
            checked: (event.target as HTMLInputElement).checked,
          }).unwrap();
        }
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
      onClick={(event) => handleChange(event)}
    >
      <Card sx={{ p: '0.5rem', position: 'relative', mb: '1rem' }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
          <Box
            sx={{
              flex:
                screenshot && (screenshot.includes('.png') || screenshot.includes('.jpg')) ? 4 : 8,
              py: '0.5rem',
            }}
          >
            <Typography variant="subtitle2" sx={{ py: '0.5rem' }}>
              {title}
            </Typography>
          </Box>
          {screenshot && (screenshot.includes('.png') || screenshot.includes('.jpg')) && (
            <Box sx={{ flex: 4 }}>
              <Image
                src={screenshot}
                width="100%"
                alt={`Screenshot of ${link}`}
                sx={{ objectFit: 'contain' }}
              />
            </Box>
          )}

          <Box sx={{ flex: 1 }}>
            <Checkbox checked={checkBoxValue} />
          </Box>
        </Box>
      </Card>
    </Link>
  );
}

export { ArticleItem };
