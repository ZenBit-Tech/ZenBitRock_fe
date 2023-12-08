import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

interface ViewOnMapProps {
  coordinates: string;
  closeModal: () => void;
}

function ViewOnMap({ coordinates, closeModal }: ViewOnMapProps): JSX.Element {
  const handleClose = () => closeModal();
  const src = `https://maps.google.com/maps?q=${coordinates}&z=15&output=embed`;

  return (
    <Box sx={{ width: 'auto', height: 'auto', padding: '0', margin: '0' }}>
      <Modal open={true}>
        <Box sx={{ position: 'relative', width: '100vw', height: '100vh' }}>
          <Button
            onClick={handleClose}
            sx={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: '100' }}
          >
            Close modal
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
