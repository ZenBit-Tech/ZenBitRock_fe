import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import Iconify from 'components/iconify';
import { colors } from 'constants/colors';
import { commonLinks } from 'constants/commonLinks';
import { useTranslations, useCloseModal } from 'hooks';

interface ViewOnMapProps {
  coordinates: string | null | undefined;
  closeModal: () => void;
  openModal: boolean;
}

export function ViewOnMap({ coordinates, closeModal, openModal }: ViewOnMapProps): JSX.Element {
  const t = useTranslations('property');

  const handleClose = (): void => closeModal();

  useCloseModal(openModal, () => closeModal());

  return (
    <Box sx={{ width: 'auto', height: 'auto', padding: '0', margin: '0' }}>
      <Modal open>
        <Box sx={{ position: 'relative', width: '100vw', height: '100vh' }}>
          <Iconify
            title={t('close')}
            color={colors.BUTTON_PRIMARY_COLOR}
            icon="carbon:close-outline"
            width="1.5rem"
            height="1.5rem"
            sx={{
              position: 'absolute',
              top: '2rem',
              right: '2rem',
              cursor: 'pointer',
              transition: 'all 200ms ease-out',
              '&:hover': {
                color: colors.BUTTON_SECOND_COLOR,
                transition: 'all 200ms ease-out',
              },
            }}
            onClick={handleClose}
          />
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
