import { useEffect } from 'react';

export const useCloseModal = (isOpen: boolean, onClose: () => void) => {
  const escapeButton = 'Escape';
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent): void => {
      if (isOpen && event.key === escapeButton) {
        onClose();
      }
    };

    const handleClick = (event: MouseEvent): void => {
      const backdrop =
        event.target instanceof HTMLElement && event.target.closest('.MuiBackdrop-root');
      const modal = event.target instanceof HTMLElement && event.target.closest('.MuiDialog-root');
      const nodeNameMatch = 'IMG';
      if (
        (isOpen && backdrop) ||
        (isOpen && modal && (event.target as HTMLElement)?.nodeName === nodeNameMatch)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyPress, true);
      document.addEventListener('mousedown', handleClick);
      document.addEventListener('click', handleClick);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyPress, true);
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('click', handleClick);
    };
  }, [isOpen, onClose]);
};
