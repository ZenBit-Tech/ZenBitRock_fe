import * as React from 'react';
import { useTranslations } from 'next-intl';
import { useDispatch } from 'react-redux';
import { enqueueSnackbar } from 'notistack';
import { DialogContentText, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useDeleteUserMutation } from 'store/api/userApi';
import { delUserFromState } from 'store/auth/authReducer';
import { StorageKey } from 'enums';

type Props = {
  id: string;
};

export default function DeleteProfileDialog({ id }: Props) {
  const t = useTranslations('editProfilePage');
  const dispatch = useDispatch();
  const [deleteUser] = useDeleteUserMutation();

  const [open, setOpen] = React.useState<boolean>(false);

  const descriptionElementRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;

      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const handleClickOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleDeleteUser = async (userId: string): Promise<void> => {
    try {
      const successMessage = t('success');

      const res = await deleteUser({ id: userId });

      if ('data' in res) {
        enqueueSnackbar(`${successMessage}`, { variant: 'success' });
        await new Promise((resolve) => setTimeout(resolve, 1000));
        dispatch(delUserFromState());
        await new Promise((resolve) => setTimeout(resolve, 1000));
        localStorage.removeItem(StorageKey.TOKEN);
        handleClose();
      }
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
          <Button onClick={handleClose} variant="contained" color="primary">
            {t('cancelBtnTxt')}
          </Button>
          <Button
            onClick={() => handleDeleteUser(id)}
            color="primary"
            variant="contained"
            sx={{
              '&:hover': { color: 'error.main' },
            }}
          >
            {t('confirmDelBtnTxt')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
