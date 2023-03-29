import React, { useEffect, useState } from "react";
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
  const [sortedDogs, setSortedDogs] = useState<Dog[]>([]);

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(activeIndex === dogs.length - 1 ? 0 : activeIndex + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  useEffect(() => {
    if (dogs.length > 0) {
      setLoading(false);
      const customSortOrder = [
        "Rottweiler",
        "Italian Greyhound",
        "American Bulldog",
        "Greyhound",
      ];

      setSortedDogs(
        dogs.sort((a, b) => {
          return (
            customSortOrder.indexOf(a.name) - customSortOrder.indexOf(b.name)
          );
        })
      );
    }
  }, [dogs]);

  return (
    <SliderContainer>
      {loading ? (
        <LoadingContainer>
          <img src={running} />
          <p>Fetching your data...</p>
        </LoadingContainer>
      ) : (
        <CarouselWrapper>
          {sortedDogs.map((dog, index) => {
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
                <h2>{dog.name}</h2>
                <p>{dog.temperament}</p>
              </SlideWrapper>
            );
          })}
          <DotsWrapper>
            {sortedDogs.map((dog, index) => (
              <React.Fragment key={index}>
                <Circle
                  onClick={() => handleDotClick(index)}
                  active={index === activeIndex}
                >
                  <Dot active={index === activeIndex} />
                </Circle>
              </React.Fragment>
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

const SlideImage = styled.img`
  width: 90%;
  height: 90%;
  object-fit: cover;
  margin-bottom: 40px;
`;

const SliderContainer = styled.div`
  width: 50%;
  margin: auto;
  text-align: center;
  font-family: "Nunito", sans-serif;
  color: #3a464f;
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
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  width: 10rem;
  justify-content: space-between;
`;

const Circle = styled.div`
  border: ${(props: { active: boolean }) =>
    props.active ? "1px solid #ff816a" : "none"};
  border-radius: 50%;
  width: 30px;
  height: 30px;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Dot = styled.div`
  width: 5px;
  height: 5px;
  border: none;
  border-radius: 50%;
  background-color: ${(props: { active: boolean }) =>
    props.active ? "#FF816A" : "#ccc"};
`;
