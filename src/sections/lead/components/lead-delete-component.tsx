import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Backdrop, CircularProgress, DialogContentText, Stack, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { enqueueSnackbar } from 'notistack';
import { AppRoute } from 'enums';
import Iconify from 'components/iconify';
import { useDeleteLeadMutation } from 'store/api/qobrixApi';

type Props = {
  id: string;
  t: Function;
};

export function LeadDeleteComponent({ id, t }: Props): JSX.Element {
  const router = useRouter();
  const descriptionElementRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [deleteLead, { isLoading }] = useDeleteLeadMutation();

  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;

      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleDeleteLead = async (userId: string): Promise<void> => {
    try {
      await deleteLead({ id: userId }).unwrap();
      handleClose();
      router.push(AppRoute.LEADS_PAGE);
    } catch (error) {
      enqueueSnackbar(t('generalErrorMessage'), { variant: 'error' });
    }
  };

  return (
    <>
      {isLoading && (
        <Backdrop open sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}>
          <CircularProgress color="primary" />
        </Backdrop>
      )}

      <Stack
        direction="row"
        sx={{
          alignItems: 'self-end',
          textDecoration: 'none',
          cursor: 'pointer',
          '&:hover': { color: 'error.main', textDecoration: 'underline' },
        }}
      >
        <Iconify icon="fluent:delete-28-regular" width={24} sx={{ mr: 1 }} />

        <Typography variant="body2" onClick={handleOpen}>
          {t('deleteLead')}
        </Typography>
      </Stack>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="lg"
      >
        <DialogTitle id="alert-dialog-title" color="primary">
          {t('modalTitle')}
        </DialogTitle>

        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {t('modalMainText1')}

            <Typography variant="body1" component="span" fontWeight="fontWeightBold">
              {t('deleteLead')}
            </Typography>

            {t('modalMainText2')}
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="primary">
            {t('cancelButton')}
          </Button>

          <Button onClick={() => handleDeleteLead(id)} color="error" variant="contained">
            {t('deleteLead')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
