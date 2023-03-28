import { useEffect, useState } from "react";
import styled from "styled-components";
import { Dog } from "../../types/Dog";
import rottweiler from "../../assets/rottweiler.svg";
import dachshund from "../../assets/dachs.svg";
import greyhound from "../../assets/greyhound.svg";
import bulldog from "../../assets/bulldog.svg";
import running from "../../assets/running.gif";

type SliderProps = {
  dogs: Dog[];
};

const Slider = ({ dogs }: SliderProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [dogSlides, setDogSlides] = useState<any[]>([]);

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

  // useEffect(() => {
  //   if (dogs.length > 0) {
  //     const filteredData = dogs.filter((item) => item.name && item.temperament);
  //     setDogSlides((prevState) => [...prevState, ...filteredData]);

  //     const dogImages = [
  //       { id: 1, src: rottweiler },
  //       { id: 2, src: dachshund },
  //       { id: 3, src: bulldog },
  //       { id: 4, src: greyhound },
  //     ];
  //     setDogSlides((prevState) => [...prevState, ...dogImages]);
  //     console.log(dogSlides);
  //   }
  // }, [dogs]);

  return (
    <SliderContainer>
      {loading ? (
        <LoadingContainer>
          <LoadingAnimation src={running} />
          <LoadingText>Fetching your data...</LoadingText>
        </LoadingContainer>
      ) : (
        <CarouselWrapper>
          {dogs.map((dog, index) => {
            let dogImage = "";
            for (let i = 0; i < dogs.length; i++) {
              if (dog.name.includes("Rottwe")) {
                dogImage = rottweiler;
              } else if (dog.name.includes("Dachsh")) {
                dogImage = dachshund;
              } else if (dog.name.includes("American Bulld")) {
                dogImage = bulldog;
              } else if (dog.name.includes("Greyh")) {
                dogImage = greyhound;
              }
            }
            return (
              <SlideWrapper key={index} active={index === activeIndex}>
                <SlideImage src={dogImage} alt={`Slide ${index + 1}`} />
                <SlideTitle>{dog.name}</SlideTitle>
                <SlideText>{dog.temperament}</SlideText>
              </SlideWrapper>
            );
          })}
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

const LoadingContainer = styled.div`
  margin-top: 50%;
`;

const LoadingAnimation = styled.img``;

const LoadingText = styled.p`
  font-family: "Nunito", sans-serif;
`;

const SlideImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  top: 0;
  left: 0;
  z-index: 0;
`;

const SliderContainer = styled.div`
  width: 50%;
  margin: auto;
  text-align: center;
`;

const CarouselWrapper = styled.div`
  width: 100%;
  height: 400px;
  margin-top: 20%;
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
  font-family: "Nunito", sans-serif;
`;

const SlideText = styled.p`
  font-family: "Nunito", sans-serif;
`;
