import * as React from 'react';
import { useTranslations } from 'next-intl';
import { DialogContentText } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function DesktopDialog({ open, onClose }: Props) {
  const t = useTranslations('signInPage');

  const descriptionElementRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;

      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="lg"
    >
      <DialogContent sx={{ paddingTop: '4rem' }}>
        <DialogContentText
          id="alert-dialog-description"
          ref={descriptionElementRef}
          tabIndex={-1}
          variant="h5"
        >
          {t('Modal.message')}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="contained" sx={{ padding: '8px 14px' }}>
          {t('Modal.btnTxt')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
