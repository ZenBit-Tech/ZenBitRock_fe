import { useEffect, useState } from 'react';

interface UseMagnifyingGlassOptions {
  magnifierHeight: number;
  magnifierWidth: number;
  zoomLevel: number;
}

interface UseMagnifyingGlassReturn {
  handleMouseEnter: (x: number, y: number, width: number, height: number) => void;
  handleMouseLeave: () => void;
  showMagnifier: boolean;
  x: number;
  y: number;
  imgWidth: number;
  imgHeight: number;
  magnifierHeight: number;
  magnifierWidth: number;
  zoomLevel: number;
}

export const useMagnifyingGlass = ({
  magnifierHeight,
  magnifierWidth,
  zoomLevel,
}: UseMagnifyingGlassOptions): UseMagnifyingGlassReturn => {
  const [[x, y], setXY] = useState<[number, number]>([0, 0]);
  const [[imgWidth, imgHeight], setSize] = useState<[number, number]>([0, 0]);
  const [showMagnifier, setShowMagnifier] = useState<boolean>(false);

  const handleMouseEnter = (x: number, y: number, width: number, height: number): void => {
    setSize([width, height]);
    setXY([x, y]);
    setShowMagnifier(true);
  };

  const handleMouseMove = (e: MouseEvent): void => {
    const elem = e.target as HTMLElement;
    if (elem instanceof HTMLElement) {
      const { top, left } = elem.getBoundingClientRect();
      const mouseX = e.pageX - left - window.scrollX;
      const mouseY = e.pageY - top - window.scrollY;
      setXY([mouseX, mouseY]);
    }
  };

  const handleMouseLeave = (): void => {
    setShowMagnifier(false);
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return {
    handleMouseEnter,
    handleMouseLeave,
    showMagnifier,
    x,
    y,
    imgWidth,
    imgHeight,
    magnifierHeight,
    magnifierWidth,
    zoomLevel,
  };
};
