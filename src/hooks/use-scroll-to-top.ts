import { useEffect, useState } from 'react';

const useScrollToTop = (): boolean => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const isPageScrolled = window.scrollY > window.innerHeight;

      setIsVisible(isPageScrolled);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return isVisible;
};

export { useScrollToTop };
