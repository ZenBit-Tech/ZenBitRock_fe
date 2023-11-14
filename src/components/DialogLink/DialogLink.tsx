import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Link, List, ListItem, Typography } from '@mui/material';

type DialogLinkProps = {
  linkText: string;
  dialogTitle: string;
  content: { [key: string]: string };
};

const DialogLink: React.FC<DialogLinkProps> = ({ linkText, dialogTitle, content }) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const scrollType: DialogProps['scroll'] = 'paper';

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
    <React.Fragment>
      <Link onClick={handleClickOpen}>{linkText}</Link>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scrollType}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        maxWidth="lg"
      >
        <DialogTitle id="scroll-dialog-title" color="primary">
          {dialogTitle}
        </DialogTitle>
        <DialogContent dividers={scrollType === 'paper'}>
          <DialogContent
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
            sx={{ px: '36px' }}
          >
            <List sx={{ listStyle: 'decimal' }}>
              {Object.keys(content).map(
                (key, index) =>
                  index % 2 === 0 && (
                    <ListItem key={key} sx={{ display: 'list-item' }}>
                      <Typography
                        variant="body1"
                        component="span"
                        mr={1}
                        fontWeight="fontWeightBold"
                      >
                        {content[key]}
                      </Typography>
                      {content[Object.keys(content)[index + 1]] && (
                        <Typography variant="body2" component="span">
                          {content[Object.keys(content)[index + 1]]}
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
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default DialogLink;
