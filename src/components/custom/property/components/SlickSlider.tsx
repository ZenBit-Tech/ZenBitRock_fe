import React, { useState, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Box, Button, Modal } from '@mui/material';
import { TFunction } from 'i18next';
import { QOBRIX_HOST } from 'config-global';
import Image from 'components/image/image';
import { IconifyStyled } from '../styles';

interface SlickSliderProps {
  photos: string[][];
  t: TFunction;
}

const SlickSlider: React.FC<SlickSliderProps> = ({ photos, t }) => {
  const [toggleModal, setToggleModal] = useState<Boolean>(false);
  const [src, setSrc] = useState<string>('');
  const [visibleArrows, setVisibleArrows] = useState<Boolean>(false);

  const sliderRef = useRef<Slider>(null);

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    outerHeight: 200,
    innerHeight: 200,
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
              backgroundColor: 'rgba(145, 158, 171, 0.08)',
            }}
            onClick={() => sliderRef?.current?.slickPrev()}
          >
            <IconifyStyled
              icon={'iconamoon:arrow-left-2-bold'}
              width={'4rem'}
              height={'4rem'}
              color="#00a76f"
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
            }}
            onClick={() => sliderRef?.current?.slickNext()}
          >
            <IconifyStyled
              icon={'iconamoon:arrow-right-2-bold'}
              width={'4rem'}
              height={'4rem'}
              color="#00a76f"
            />
          </Button>
        </>
      )}
      <Slider {...settings} ref={sliderRef}>
        {photos.map((photo, index) => (
          <Box key={index}>
            <Image
              src={`${QOBRIX_HOST}${photo[1]}`}
              alt={`Slide ${index + 1}`}
              width={200}
              height={100}
              style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer' }}
              onClick={(e) => {
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
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    border: 'none',
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
                    }}
                    onClick={() => setToggleModal(false)}
                  />
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
