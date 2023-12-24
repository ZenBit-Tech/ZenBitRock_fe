import { useEffect } from 'react';

const FETCH_NEXT_BEFORE: number = 200;
const INNER_HEIGHT: string = 'innerHeight';

interface InfiniteScrollProps {
  callback: () => void;
}

function useInfinityScroll({ callback }: InfiniteScrollProps): void {
  useEffect(() => {
    function handleScroll() {
      const windowHeight =
        INNER_HEIGHT in window ? window.innerHeight : document.documentElement.offsetHeight;

      const { body } = document;
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

export { useInfinityScroll };
