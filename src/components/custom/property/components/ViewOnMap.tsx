import { TFunction } from 'i18next';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { IconifyStyled } from '../styles';
import { useTranslations } from 'next-intl';

interface ViewOnMapProps {
  coordinates: string | null | undefined;
  closeModal: () => void;
}

function ViewOnMap({ coordinates, closeModal }: ViewOnMapProps): JSX.Element {
  const t = useTranslations('property');

  const handleClose = (): void => closeModal();
  const src = `https://maps.google.com/maps?q=${coordinates}&z=15&output=embed`;

  return (
    <Box sx={{ width: 'auto', height: 'auto', padding: '0', margin: '0' }}>
      <Modal open={true}>
        <Box sx={{ position: 'relative', width: '100vw', height: '100vh' }}>
          <Button
            title={t('close')}
            sx={{
              width: 'fit-content',
              height: 'fit-content',
              position: 'absolute',
              zIndex: '10',
              top: '2rem',
              right: '2rem',
              backgroundColor: 'rgba(145, 158, 171, 0.08)',
            }}
            onClick={handleClose}
          >
            <IconifyStyled
              icon={'mingcute:close-fill'}
              width={'3rem'}
              height={'3rem'}
              color="#00a76f"
            />
          </Button>
          <iframe
            width="100%"
            height="100%"
            style={{ border: '0' }}
            referrerPolicy="no-referrer-when-downgrade"
            src={src}
            allowFullScreen
          />
        </Box>
      </Modal>
    </Box>
  );
}

export default ViewOnMap;
