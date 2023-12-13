import { Link, List, ListItem, Typography, Button } from '@mui/material';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';
import { Locale } from 'locales/i18n.config';

type SignUpPageType = {
  Main: {
    [key: string]: string;
  };
  Terms: {
    [key: string]: string;
  };
  TermsContent: {
    [key: string]: string;
  };
};

type SignUpProps = {
  SignUpPage: SignUpPageType;
};

export default function TermsDialog({ SignUpPage }: SignUpProps) {
  const [open, setOpen] = React.useState<boolean>(false);
  const scrollType: DialogProps['scroll'] = 'paper';
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

  return (
    <>
      <Link onClick={handleClickOpen} sx={{ cursor: 'pointer' }}>
        {SignUpPage.Terms.termsLink}
      </Link>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scrollType}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        maxWidth="lg"
      >
        <DialogTitle
          id="scroll-dialog-title"
          color="primary"
          sx={{ paddingTop: '2rem', paddingBottom: '1rem', marginLeft: '16px' }}
        >
          {SignUpPage.Terms.TermsTitle}
        </DialogTitle>
        <DialogContent dividers={scrollType === 'paper'}>
          <DialogContent
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
            sx={{ px: '36px' }}
          >
            <List sx={{ listStyle: 'decimal' }}>
              {Object.keys(SignUpPage.TermsContent).map(
                (key, index) =>
                  index % 2 === 0 && (
                    <ListItem key={key} sx={{ display: 'list-item' }}>
                      <Typography
                        variant="body1"
                        component="span"
                        mr={1}
                        fontWeight="fontWeightBold"
                      >
                        {SignUpPage.TermsContent[key]}
                      </Typography>
                      {SignUpPage.TermsContent[Object.keys(SignUpPage.TermsContent)[index + 1]] && (
                        <Typography variant="body2" component="span">
                          {SignUpPage.TermsContent[Object.keys(SignUpPage.TermsContent)[index + 1]]}
                        </Typography>
                      )}
                    </ListItem>
                  )
              )}
            </List>
          </DialogContent>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="primary">
            {SignUpPage.Terms.btnTxt}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
