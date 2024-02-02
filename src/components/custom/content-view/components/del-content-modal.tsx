'use client';

import { Button, Typography, Box, Stack } from '@mui/material';
import { LoadingScreen } from 'components/loading-screen';
import { useSnackbar } from 'components/snackbar';
import { useDeleteContentMutation } from 'store/content/content-api';

type Props = {
  t: Function;
  closeModalUp: () => void;
  id: string;
};

export function DeleteContentModal({ t, closeModalUp, id }: Props): JSX.Element {
  const [deleteContent, { isLoading }] = useDeleteContentMutation();
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = async (contentId: string): Promise<void> => {
    try {
      await deleteContent(contentId).unwrap();
    } catch (error) {
      enqueueSnackbar(`${t('somethingWentWrong')}: ${error.data.message}`, {
        variant: 'error',
      });
    }
  };

  return (
    <Box>
      <Typography variant="h3" sx={{ marginBottom: '1.5rem', textAlign: 'center' }}>
        {t('deleteApprove')}
      </Typography>
      <Stack sx={{ mt: 5, position: 'relative' }}>
        {isLoading && (
          <LoadingScreen
            sx={{
              position: 'absolute',
              top: '-70px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: '100',
            }}
          />
        )}
        <Button
          type="submit"
          variant="contained"
          color="error"
          sx={{ mb: '1rem' }}
          onClick={() => handleDelete(id)}
        >
          {t('delete')}
        </Button>
        <Button type="reset" variant="contained" color="primary" onClick={() => closeModalUp()}>
          {t('cancel')}
        </Button>
      </Stack>
    </Box>
  );
}
