import { useEffect } from 'react';

const FETCH_NEXT_BEFORE = 200;

interface InfiniteScrollProps {
  callback: () => void;
}

function useInfinityScroll({ callback }: InfiniteScrollProps): void {
  useEffect(() => {
    function handleScroll() {
      const windowHeight =
        'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;

      const body = document.body;
      const html = document.documentElement;

      const docHeight = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      );
      const windowBottom = windowHeight + window.scrollY;

      if (windowBottom >= docHeight - FETCH_NEXT_BEFORE) {
        callback();
      }
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [callback]);
}

export default useInfinityScroll;
