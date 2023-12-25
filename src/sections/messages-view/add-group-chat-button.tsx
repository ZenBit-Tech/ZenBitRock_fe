import { Button } from '@mui/material';
import Iconify from 'components/iconify';

type Props = {
  t: Function;
};

export default function AddGroupChatButton({ t }: Props): JSX.Element {
  return (
    <Button
      title={t('addGroupChatButton')}
      sx={{ padding: '14px' }}
      variant="contained"
      color="primary"
    >
      <Iconify icon="subway:add" height="auto" />
    </Button>
  );
}
