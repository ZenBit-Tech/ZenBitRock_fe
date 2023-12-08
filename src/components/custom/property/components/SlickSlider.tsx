import { QOBRIX_HOST } from 'config-global';
import React, { useRef, useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Slider, { Settings } from 'react-slick';

const EACH_SLIDE_WIDTH = 176;

interface ImageSliderProps {
  data: { thumbnail: string; reach: number; comment: number }[];
}

const SlickSlider: React.FC<ImageSliderProps> = ({ photos }: { photos: string[][] }) => {
  const sliderRef = useRef<Slider>(null);
  const sliderWrapperRef = useRef<HTMLDivElement>(null);

  const [showRightArrow, setShowRightArrow] = useState<boolean>(false);
  const [showLeftArrow, setShowLeftArrow] = useState<boolean>(false);
  const [maxNumberOfCardsToShow, setMaxNumberOfCardsToShow] = useState<number>(0);

  const settings: Settings = {
    dots: true,
    lazyLoad: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 2,
  };

  const handleChangeSlide = (currentSlide: number) => {
    const leftArrowVisible = currentSlide !== 0;

    const rightArrowVisible = currentSlide <= photos.length - maxNumberOfCardsToShow;

    setShowLeftArrow(leftArrowVisible);

    setShowRightArrow(rightArrowVisible);
  };

  useEffect(() => {
    const wrapperWidth = sliderWrapperRef.current.clientWidth || 0;

    const maxNumberOfCards = Math.ceil(wrapperWidth / EACH_SLIDE_WIDTH);

    setMaxNumberOfCardsToShow(maxNumberOfCards);

    setShowRightArrow(photos.length > maxNumberOfCards);
  }, []);

  return (
    <SliderWrapper ref={sliderWrapperRef}>
      {showLeftArrow && <button onClick={() => sliderRef.current.slickPrev()}>left</button>}
      <Slider {...settings} ref={sliderRef}>
        {photos.map((photo, idx) => (
          <div>
            <Image
              key={idx}
              src={`${QOBRIX_HOST}${photo[1]}`}
              alt={`Property image ${idx + 1}`}
              width={200}
              height={100}
            />
          </div>
        ))}
      </Slider>
      {showRightArrow && <button onClick={() => sliderRef.current.slickNext()}>right</button>}
    </SliderWrapper>
  );
};

const SliderWrapper = styled.div`
  position: relative;
`;
// Inline styles generated from `react-slick` in here
const ImageWrapper = styled.div`
  &:focus {
    outline: none;
  }
`;
const Image = styled.div<{ src: string | null }>`
  width: 160px;
  height: 280px;
  margin-right: 16px;
  background-image: ${({ src }) => (!!src ? `url(${src})` : 'none')};
  display: flex;
  align-items: flex-end;
`;
const EngagementInfo = styled.div`
  color: #fff;
  font-size: 11px;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  flex: 1;
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8));
`;
const InfoWrapper = styled.div`
  padding: 0 8px 8px;
`;
const Label = styled.p`
  margin-bottom: 3px;
`;
const Count = styled.p``;

export default SlickSlider;
