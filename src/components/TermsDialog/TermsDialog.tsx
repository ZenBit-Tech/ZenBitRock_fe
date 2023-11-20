import * as React from 'react';

import { Link, List, ListItem, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
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
    <React.Fragment>
      <Link onClick={handleClickOpen}>{SignUpPage.Terms.termsLink}</Link>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scrollType}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        maxWidth="lg"
      >
        <DialogTitle id="scroll-dialog-title" color="primary">
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
          <Button onClick={handleClose} color="primary">
            {SignUpPage.Terms.btnTxt}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
