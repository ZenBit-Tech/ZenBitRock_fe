import { useEffect } from 'react';

export const useCloseModal = (isOpen: boolean, onClose: () => void) => {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (isOpen && event.key === 'Escape') {
        onClose();
      }
    };

    const handleBackdropClick = (event: MouseEvent) => {
      // Check if the click is outside the modal content
      const isClickInsideModal =
        event.target instanceof HTMLElement && event.target.closest('.MuiDialog-root');

      // Check if the modal is open and the click is outside the modal
      if (isOpen && !isClickInsideModal) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyPress, true);
      document.addEventListener('mousedown', handleBackdropClick);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyPress, true);
      document.removeEventListener('mousedown', handleBackdropClick);
    };
  }, [isOpen, onClose]);
};
