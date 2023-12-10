import { useEffect } from 'react';

export const useCloseModal = (isOpen: boolean, onClose: () => void) => {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (isOpen && event.key === 'Escape') {
        onClose();
      }
    };

    const handleClick = (event: MouseEvent) => {
      const backdrop =
        event.target instanceof HTMLElement && event.target.closest('.MuiBackdrop-root');
      const modal = event.target instanceof HTMLElement && event.target.closest('.MuiDialog-root');

      if (
        (isOpen && backdrop) ||
        (isOpen && modal && (event.target as HTMLElement)?.nodeName === 'IMG')
      ) {
        onClose();
      }
    };

    const handleOutsideClick = (event: MouseEvent) => {
      if (isOpen && event.target === event.currentTarget) {
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
