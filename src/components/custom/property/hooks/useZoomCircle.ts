// hooks/useZoomCircle.ts
import { useEffect, useRef, useState } from 'react';

interface UseZoomCircleOptions {
  radius: number;
  scale: number;
  loupeSize: number; // Added loupeSize option for the size of the magnifying glass
}

const useZoomCircle = ({ radius, scale, loupeSize }: UseZoomCircleOptions) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const circleRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const handleMouseMove = (event: MouseEvent) => {
    setPosition({ x: event.clientX, y: event.clientY });
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    // Calculate the position of the zooming circle
    if (circleRef.current) {
      const left = position.x - loupeSize / 2;
      const top = position.y - loupeSize / 2;

      // Apply the position to the circle
      circleRef.current.style.left = `${left}px`;
      circleRef.current.style.top = `${top}px`;
    }

    // Calculate the scale for the image
    if (imageRef.current) {
      const dx = position.x - imageRef.current.offsetLeft;
      const dy = position.y - imageRef.current.offsetTop;

      const scaleX = scale;
      const scaleY = scale;

      imageRef.current.style.transform = `scale(${scaleX}, ${scaleY})`;
      imageRef.current.style.transformOrigin = `${dx}px ${dy}px`;
    }
  }, [position, loupeSize, scale]);

  return { circleRef, imageRef, position };
};

export default useZoomCircle;
