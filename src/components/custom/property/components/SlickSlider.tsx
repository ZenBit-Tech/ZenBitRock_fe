import React, { useRef } from 'react';
import { Box, Button, Modal } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ButtonClose from 'components/custom/button-close/button-close';
import Image from 'components/image/image';
import { QOBRIX_HOST } from 'config-global';
import { colors } from 'constants/colors';
import { useTranslations, useMagnifyingGlass, useCloseModal, useState, useEffect } from 'hooks';
import { IconifyStyled } from 'components/custom/property/styles';

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

export const SlickSlider: React.FC<SlickSliderProps> = ({ photos }) => {
  const t = useTranslations('property');

  const [toggleModal, setToggleModal] = useState<boolean>(false);
  const [center, setCenter] = useState<number>(DEFAULT_POSITION);
  const [visibleArrows, setVisibleArrows] = useState<boolean>(false);
  const [indexPhoto, setIndexPhoto] = useState<number | null>(null);
  const sliderRef = useRef<Slider>(null);
  const modalContainerRef = useRef<HTMLDivElement>(null);

  const handleClose = (): void => setToggleModal(false);

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
      className="container"
      sx={{
        position: 'relative',
        textShadow: `1px 1px 2px ${colors.PRIMARY_DARK_COLOR}`,
        height: '200px',
        width: '100%',
        borderTopRightRadius: '8px',
        borderTopLeftRadius: '8px',
        overflow: 'hidden',
        '& > .slick-slider > .slick-dots': {
          '& > li > button::before': {
            color: colors.BUTTON_PRIMARY_COLOR,
            textShadow: `0px 0px 2px ${colors.PRIMARY_LIGHT_COLOR}`,
          },
          '& > .slick-active > button::before': {
            opacity: '1',
            color: colors.BUTTON_SECOND_COLOR,
          },
          top: '10rem',
          transform: 'scale(2)',
          height: 'fit-content',
        },
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
            <ButtonClose
              top="2rem"
              right="2rem"
              width="1.5rem"
              height="1.5rem"
              handleClose={handleClose}
            />
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
                      border: `1px solid ${colors.BUTTON_PRIMARY_COLOR}`,
                      backgroundColor: colors.PRIMARY_LIGHT_COLOR,
                      backgroundImage: `url('${QOBRIX_HOST}${photo[0]}')`,
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: `${imgWidth * zoomLevel}px ${imgHeight * zoomLevel}px`,
                      backgroundPositionX: `${-x * zoomLevel + magnifierWidth / 2}px`,
                      backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`,
                      zIndex: '100',
                      borderRadius: '50%',
                    }}
                  />
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
                      e.pageX - Number(modalContainerRef.current?.offsetLeft!),
                      e.pageY - Number(modalContainerRef.current?.offsetTop!),
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
