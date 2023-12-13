import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useTranslations } from 'next-intl';
import { colors } from 'constants/colors';
import { commonLinks } from 'constants/commonLinks';
import { useCloseModal } from '../hooks/useCloseModal';
import { IconifyStyled } from '../styles';

interface ViewOnMapProps {
  coordinates: string | null | undefined;
  closeModal: () => void;
  openModal: boolean;
}

function ViewOnMap({ coordinates, closeModal, openModal }: ViewOnMapProps): JSX.Element {
  const t = useTranslations('property');

  const handleClose = (): void => closeModal();

  useCloseModal(openModal, () => closeModal());

  return (
    <Box sx={{ width: 'auto', height: 'auto', padding: '0', margin: '0' }}>
      <Modal open>
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
              icon="mingcute:close-fill"
              width="3rem"
              height="3rem"
              color={colors.BUTTON_PRIMARY_COLOR}
            />
          </Button>
          <iframe
            title={t('map')}
            width="100%"
            height="100%"
            style={{ border: '0' }}
            referrerPolicy="no-referrer-when-downgrade"
            src={`${commonLinks.PROPERTY_LOCATION}${coordinates}`}
            allowFullScreen
          />
        </Box>
      </Modal>
    </Box>
  );
}

export default ViewOnMap;
