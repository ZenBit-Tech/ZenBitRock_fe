// components/SlickSlider.tsx
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
import useZoomCircle from '../hooks/useZoomCircle';
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

const SlickSlider: React.FC<SlickSliderProps> = ({ photos }) => {
  const t = useTranslations('property');

  const [toggleModal, setToggleModal] = useState<boolean>(false);
  const [center, setCenter] = useState<number>(DEFAULT_POSITION);
  const [visibleArrows, setVisibleArrows] = useState<boolean>(false);

  const sliderRef = useRef<Slider>(null);
  const modalContainerRef = useRef<HTMLDivElement>(null);

  useCloseModal(toggleModal, () => setToggleModal(false));
  const { circleRef, imageRef, position } = useZoomCircle({
    radius: 50,
    scale: 1.2,
    loupeSize: 200, // Added loupeSize option for the size of the magnifying glass
  });

  useEffect(() => {
    if (toggleModal) {
      setTimeout(
        () =>
          (document.querySelector(`#image-${center}`) as HTMLDivElement)?.scrollIntoView({
            behavior: 'smooth',
          }),
        200
      );
    }
  }, [toggleModal]);

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
        transition: 'easy-in 200 all',
      }}
      onMouseOut={(): void => setVisibleArrows(false)}
      onMouseOver={(): void => setVisibleArrows(true)}
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
              backgroundColor: 'rgba(145, 158, 171, 0.08)',
              transition: 'easy-in 200 all',
            }}
            onClick={(): void => sliderRef?.current?.slickPrev()}
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
              backgroundColor: 'rgba(145, 158, 171, 0.08)',
              transition: 'easy in 200 all',
            }}
            onClick={(): void => sliderRef?.current?.slickNext()}
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
          <Image
            key={index}
            src={`${QOBRIX_HOST}${photo[1]}`}
            alt={`Slide ${index + 1}`}
            width={200}
            height={100}
            sx={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer' }}
            onClick={(): void => {
              setToggleModal(true);
              setCenter(index);
            }}
          />
        ))}
      </Slider>
      {toggleModal && (
        <Modal open sx={{ overflow: 'scroll' }} ref={imageRef}>
          <Box ref={modalContainerRef} sx={{ height: 'fit-content' }}>
            <div
              ref={circleRef}
              style={{
                position: 'absolute',
                width: `${200}px`,
                height: `${200}px`,
                borderRadius: '50%',
                border: '2px solid red',
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none',
                left: `${position.x}px`,
                top: `${position.y}px`,
                zIndex: 1,
              }}
            ></div>

            {photos.map((photo, index) => (
              <Box
                key={index}
                id={`image-${index}`}
                sx={{
                  display: 'block',
                  width: '100%',
                  height: 'auto',
                  objectFit: 'cover',
                }}
              >
                <Image
                  src={`${QOBRIX_HOST}${photo[0]}`}
                  alt={`Slide ${index * 100 + 1}`}
                  width={200}
                  height={100}
                  sx={{
                    display: 'block',
                    width: '100%',
                    height: 'auto',
                    objectFit: 'cover',
                  }}
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
