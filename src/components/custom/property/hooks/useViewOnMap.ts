import { useEffect } from 'react';

const FETCH_NEXT_BEFORE = 200;

interface InfiniteScrollProps {
  callback: () => void;
}

function useViewOnMap(coordinates: string): void {
  console.log(coordinates);
}

export default useViewOnMap;
