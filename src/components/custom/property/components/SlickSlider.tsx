import React, { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Box, Button, Modal } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'components/image/image';
import { QOBRIX_HOST } from 'config-global';
import { colors } from 'constants/colors';
import { useCloseModal } from '../hooks/useCloseModal';
import useMagnifyingGlass from '../hooks/useMagnifyingGlass';
import { IconifyStyled } from '../styles';

interface SlickSliderProps {
  photos: string[][];
}

const SETTINGS = {
  dots: true,
  arrows: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  outerHeight: 200,
  innerHeight: 200,
};

const DEFAULT_POSITION = 0;
const MAGNIFIER_HEIGHT = 200;
const MAGNIFIER_WIDTH = 200;
const ZOOM_LEVEL = 3;

const SlickSlider: React.FC<SlickSliderProps> = ({ photos }) => {
  const t = useTranslations('property');

  const [toggleModal, setToggleModal] = useState<boolean>(false);
  const [center, setCenter] = useState<number>(DEFAULT_POSITION);
  const [visibleArrows, setVisibleArrows] = useState<boolean>(false);
  const [indexPhoto, setIndexPhoto] = useState<number | null>(null);
  const sliderRef = useRef<Slider>(null);
  const modalContainerRef = useRef<HTMLDivElement>(null);

  useCloseModal(toggleModal, () => setToggleModal(false));
  const {
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
  } = useMagnifyingGlass({
    magnifierHeight: MAGNIFIER_HEIGHT,
    magnifierWidth: MAGNIFIER_WIDTH,
    zoomLevel: ZOOM_LEVEL,
  });

  useEffect(() => {
    if (toggleModal) {
      setTimeout(
        () =>
          (document.getElementById(`image-${center}`) as HTMLDivElement)?.scrollIntoView({
            behavior: 'smooth',
          }),
        200
      );
    }
  }, [toggleModal, center]);

  return (
    <Box
      sx={{
        position: 'relative',
        textShadow: '1px 1px 2px black',
        height: '200px',
        width: '100%',
        borderTopRightRadius: '8px',
        borderTopLeftRadius: '8px',
        overflow: 'hidden',
      }}
      onMouseOut={() => setVisibleArrows(false)}
      onMouseOver={() => setVisibleArrows(true)}
    >
      {visibleArrows && (
        <>
          <Button
            title={t('left')}
            sx={{
              height: 'fit-content',
              width: 'fit-content',
              position: 'absolute',
              zIndex: '10',
              top: '50%',
              transform: 'translateY(-50%)',
              left: '0.5rem',
              transition: 'easy-in 200 all',
              backgroundColor: colors.ARROW_SECONDARY,
              opacity: '0.3',
            }}
            onClick={() => sliderRef?.current?.slickPrev()}
          >
            <IconifyStyled
              icon="iconamoon:arrow-left-2-bold"
              width="4rem"
              height="4rem"
              color={colors.BUTTON_PRIMARY_COLOR}
            />
          </Button>
          <Button
            title={t('left')}
            sx={{
              width: 'fit-content',
              height: 'fit-content',
              position: 'absolute',
              zIndex: '10',
              top: '50%',
              transform: 'translateY(-50%)',
              right: '0.5rem',
              transition: 'easy in 200 all',
              backgroundColor: colors.ARROW_SECONDARY,
              opacity: '0.3',
            }}
            onClick={() => sliderRef?.current?.slickNext()}
          >
            <IconifyStyled
              icon="iconamoon:arrow-right-2-bold"
              width="4rem"
              height="4rem"
              color={colors.BUTTON_PRIMARY_COLOR}
            />
          </Button>
        </>
      )}
      <Slider {...SETTINGS} ref={sliderRef}>
        {photos.map((photo, index) => (
          <Box
            key={index}
            sx={{
              height: '100%',
              width: '100%',
              position: 'relative',
              cursor: 'pointer',
            }}
          >
            <Image
              key={index}
              src={`${QOBRIX_HOST}${photo[1]}`}
              alt={`Slide ${index + 1}`}
              width={200}
              height={100}
              sx={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer' }}
              onClick={() => {
                setToggleModal(true);
                setCenter(index);
                setIndexPhoto(index);
              }}
            />
          </Box>
        ))}
      </Slider>
      {toggleModal && (
        <Modal open sx={{ overflow: 'scroll' }} ref={modalContainerRef}>
          <Box ref={modalContainerRef} sx={{ height: 'fit-content' }}>
            {photos.map((photo, idx) => (
              <Box
                key={idx}
                id={`image-${idx}`}
                sx={{
                  display: 'block',
                  width: '100%',
                  height: 'auto',
                  objectFit: 'cover',
                  position: 'relative',
                }}
              >
                {idx === indexPhoto && showMagnifier && (
                  <div
                    style={{
                      display: showMagnifier ? '' : 'none',
                      position: 'absolute',
                      pointerEvents: 'none',
                      height: `${magnifierHeight}px`,
                      width: `${magnifierWidth}px`,
                      top: `${y - magnifierHeight / 2}px`,
                      left: `${x - magnifierWidth / 2}px`,
                      opacity: '1',
                      border: '1px solid lightgray',
                      backgroundColor: 'white',
                      backgroundImage: `url('${QOBRIX_HOST}${photo[0]}')`,
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: `${imgWidth * zoomLevel}px ${imgHeight * zoomLevel}px`,
                      backgroundPositionX: `${-x * zoomLevel + magnifierWidth / 2}px`,
                      backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`,
                      zIndex: '100',
                      borderRadius: '50%',
                    }}
                  ></div>
                )}
                <Image
                  id={`${idx}`}
                  src={`${QOBRIX_HOST}${photo[0]}`}
                  alt={`Slide ${idx * 100 + 1}`}
                  width={200}
                  height={100}
                  sx={{
                    display: 'block',
                    width: '100%',
                    height: 'auto',
                    objectFit: 'cover',
                  }}
                  onMouseEnter={(e) => {
                    handleMouseEnter(
                      e.pageX - modalContainerRef.current?.offsetLeft!,
                      e.pageY - modalContainerRef.current?.offsetTop!,
                      (e.target as HTMLImageElement).width,
                      (e.target as HTMLImageElement).height
                    );
                    setIndexPhoto(
                      Number(
                        ((e.target as HTMLImageElement)?.parentNode?.parentNode as HTMLSpanElement)
                          ?.id
                      )
                    );
                  }}
                  onMouseLeave={handleMouseLeave}
                />
              </Box>
            ))}
          </Box>
        </Modal>
      )}
    </Box>
  );
};

export default SlickSlider;
