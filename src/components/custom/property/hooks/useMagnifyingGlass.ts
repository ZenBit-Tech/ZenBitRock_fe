import { useEffect, useState } from 'react';

interface UseMagnifyingGlassOptions {
  magnifierHeight: number;
  magnifierWidth: number;
  zoomLevel: number;
}

const useMagnifyingGlass = ({
  magnifierHeight,
  magnifierWidth,
  zoomLevel,
}: UseMagnifyingGlassOptions) => {
  const [[x, y], setXY] = useState<[number, number]>([0, 0]);
  const [[imgWidth, imgHeight], setSize] = useState<[number, number]>([0, 0]);
  const [showMagnifier, setShowMagnifier] = useState(false);

  const handleMouseEnter = (x: number, y: number, width: number, height: number) => {
    setSize([width, height]);
    setXY([x, y]); // Set initial mouse position
    setShowMagnifier(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    const elem = e.target as HTMLElement;
    if (elem instanceof HTMLElement) {
      const { top, left } = elem.getBoundingClientRect();
      const mouseX = e.pageX - left - window.scrollX;
      const mouseY = e.pageY - top - window.scrollY;
      setXY([mouseX, mouseY]);
    }
  };

  const handleMouseLeave = () => {
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

export default useMagnifyingGlass;
