import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { DialogContentText, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useDeleteUserMutation } from 'store/api/userApi';
import { enqueueSnackbar } from 'notistack';
import { AppRoute, StorageKey } from 'enums';

type Props = {
  id: string;
};

export default function DeleteProfileDialog({ id }: Props) {
  const t = useTranslations('editProfilePage');
  const router = useRouter();

  const [open, setOpen] = React.useState<boolean>(false);
  const [deleteUser] = useDeleteUserMutation();

  const descriptionElementRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;

      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      const successMessage = t('success');

      await deleteUser({ id: userId });
      localStorage.removeItem(StorageKey.TOKEN);
      enqueueSnackbar(successMessage, { variant: 'success' });
      handleClose();

      await new Promise((resolve) => setTimeout(resolve, 1000));

      router.push(AppRoute.SIGN_UP_PAGE);
    } catch (error) {
      const errMessage = t('error');
      enqueueSnackbar(errMessage, { variant: 'error' });
    }
  };

  return (
    <>
      <Typography
        variant="body2"
        onClick={handleClickOpen}
        sx={{
          textDecoration: 'none',
          cursor: 'pointer',
          '&:hover': { color: 'error.main', textDecoration: 'underline' },
        }}
      >
        {t('deleteProfile')}
      </Typography>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="lg"
      >
        <DialogTitle id="alert-dialog-title" color="primary">
          {t('delTitle')}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {t('pressing')}
            <Typography variant="body1" component="span" fontWeight="fontWeightBold">
              {t('delBold')}
            </Typography>
            {t('delTxt2')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {t('cancelBtnTxt')}
          </Button>
          <Button
            onClick={() => handleDeleteUser(id)}
            color="primary"
            sx={{ '&:hover': { color: 'error.main' } }}
          >
            {t('confirmDelBtnTxt')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
