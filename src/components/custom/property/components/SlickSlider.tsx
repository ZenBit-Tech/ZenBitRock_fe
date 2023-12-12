import React, { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Box, Button, Modal } from '@mui/material';
import { QOBRIX_HOST } from 'config-global';
import Image from 'components/image/image';
import { colors } from 'constants/colors';
import { IconifyStyled } from '../styles';
import { useCloseModal } from '../hooks/useCloseModal';

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

const MIN_SCALE = 1;
const MAX_SCALE = 3;

const SlickSlider: React.FC<SlickSliderProps> = ({ photos }) => {
  const t = useTranslations('property');

  const [toggleModal, setToggleModal] = useState<boolean>(false);
  const [src, setSrc] = useState<string>('');
  const [visibleArrows, setVisibleArrows] = useState<boolean>(false);
  const [scale, setScale] = useState(MIN_SCALE);

  const sliderRef = useRef<Slider>(null);

  useCloseModal(toggleModal, () => setToggleModal(false));

  const handleZoomIn = () => {
    setScale((prevScale) => Math.min(prevScale + 0.2, MAX_SCALE));
  };

  const handleZoomOut = () => {
    setScale((prevScale) => Math.max(prevScale - 0.2, MIN_SCALE));
  };

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
              icon={'iconamoon:arrow-left-2-bold'}
              width={'4rem'}
              height={'4rem'}
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
              icon={'iconamoon:arrow-right-2-bold'}
              width={'4rem'}
              height={'4rem'}
              color={colors.BUTTON_PRIMARY_COLOR}
            />
          </Button>
        </>
      )}
      <Slider {...SETTINGS} ref={sliderRef}>
        {photos.map((photo, index) => (
          <Box key={index}>
            <Image
              src={`${QOBRIX_HOST}${photo[1]}`}
              alt={`Slide ${index + 1}`}
              width={200}
              height={100}
              sx={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer' }}
              onClick={(e): void => {
                setToggleModal(true);
                setSrc(
                  (e.currentTarget.children[0].children[0] as HTMLImageElement).src
                    .split('large')
                    .join('original')
                );
              }}
            />
            {toggleModal && (
              <Modal open={true}>
                <Box
                  className={'for-custom-scroll'}
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    border: 'none',
                    overflow: 'auto',
                  }}
                >
                  <Box
                    sx={{
                      transform: `scale(${scale})`,
                      transition: 'transform 0.2s ease-out',
                      cursor: 'pointer',
                    }}
                  >
                    <Image
                      src={src}
                      alt={`Slide original ${index + 1}`}
                      sx={{
                        width: '100vw',
                        height: 'auto',
                        objectFit: 'cover',
                        cursor: 'pointer',
                        transition: 'easy-in 200 all',
                      }}
                      onClick={(): void => {
                        setToggleModal(false);
                        setScale(1);
                      }}
                    />
                  </Box>
                  <Button
                    onClick={handleZoomOut}
                    sx={{
                      position: 'absolute',
                      top: '10px',
                      left: '10px',
                      opacity: scale === MIN_SCALE ? 0.1 : 1,
                    }}
                  >
                    <IconifyStyled
                      icon={'pepicons-pencil:loop-minus-circle'}
                      width={'3rem'}
                      height={'3rem'}
                      color={colors.BUTTON_PRIMARY_COLOR}
                    />
                  </Button>
                  <Button
                    onClick={handleZoomIn}
                    sx={{
                      position: 'absolute',
                      top: '10px',
                      left: '80px',
                      opacity: scale === MAX_SCALE ? 0.1 : 1,
                    }}
                  >
                    <IconifyStyled
                      icon={'pepicons-pencil:loop-plus-circle'}
                      width={'3rem'}
                      height={'3rem'}
                      color={colors.BUTTON_PRIMARY_COLOR}
                    />
                  </Button>
                </Box>
              </Modal>
            )}
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default SlickSlider;
