import { useEffect, useState } from "react";
import styled from "styled-components";
import { Dog } from "../../types/Dog";

type SliderProps = {
  dogs: Dog[];
};

const Slider = ({ dogs }: SliderProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(activeIndex === dogs.length - 1 ? 0 : activeIndex + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    if (dogs.length > 0) {
      setLoading(false);
    }
  }, [dogs]);

  return (
    <SliderContainer>
      {loading ? (
        // <Lottie options={defaultOptions} />
        <p>Loading...</p>
      ) : (
        <CarouselWrapper>
          {dogs.map((dog, index) => (
            <SlideWrapper key={index} active={index === activeIndex}>
              {/* <Slide src={dog} alt={`Slide ${index + 1}`} /> */}
              <SlideTitle>{dog.name}</SlideTitle>
              <SlideText>{dog.temperament}</SlideText>
            </SlideWrapper>
          ))}
          <DotsWrapper>
            {dogs.map((dog, index) => (
              <Dot
                key={index}
                active={index === activeIndex}
                onClick={() => handleDotClick(index)}
              />
            ))}
          </DotsWrapper>
        </CarouselWrapper>
      )}
    </SliderContainer>
  );
};

export default Slider;

const SliderContainer = styled.div``;

const CarouselWrapper = styled.div`
  width: 100%;
  height: 400px;
  position: relative;
`;

const SlideWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: ${(props: { active: boolean }) => (props.active ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
`;

const DotsWrapper = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
`;

const Dot = styled.button`
  width: 5px;
  height: 5px;
  border: none;
  border-radius: 50%;
  background-color: ${(props: { active: boolean }) =>
    props.active ? "#333" : "#ccc"};
  margin-right: 10px;
  cursor: pointer;
`;

const SlideTitle = styled.h2`
  // width: 100%;
  // height: 100%;
  // font-size: 50px;
  // position: absolute;
  // text-align: center;
  // top: 40%;
  // z-index: 10;
`;

const SlideText = styled.h3`
  // width: 100%;
  // height: 100%;
  // position: absolute;
  // text-align: center;
  // z-index: 10;
  // top: 65%;
  // font-size: 2rem;
`;
