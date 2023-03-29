import { useState, useEffect } from "react";
import styled from "styled-components";
import { Slider } from "./components";
import { Dog } from "./types/Dog";

function App() {
  const [breedsData, setBreedsData] = useState<Dog[]>([]);
  const [selectedBreeds, setSelectedBreeds] = useState<Dog[]>([]);

  useEffect(() => {
    fetch(
      `https://api.thedogapi.com/v1/breeds?api_key=${import.meta.env.API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        setBreedsData(data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    let filteredBreeds: Dog[] = [];
    if (breedsData.length > 0) {
      breedsData.forEach((breed) => {
        if (
          breed.name.includes("Rottwe") ||
          breed.name.includes("Dachsh") ||
          breed.name.includes("American Bulld") ||
          breed.name.includes("Greyh")
        ) {
          filteredBreeds.push(breed);
        }
      });
      setSelectedBreeds(filteredBreeds);
    }
  }, [breedsData]);

  return (
    <MainContainer>
      <LeftSideContainer></LeftSideContainer>
      <RightSideContainer>
        <Slider dogs={selectedBreeds} />
      </RightSideContainer>
    </MainContainer>
  );
}

export default App;

const MainContainer = styled.main`
  display: flex;
`;

const LeftSideContainer = styled.div`
  margin: 0;
  background-color: #eeeeee;
  width: 50%;
  height: 100vh;
  display: flex;
  @media (max-width: 768px) {
    display: none;
  }
`;
const RightSideContainer = styled.div`
  background-color: #ffffff;
  width: 50%;
  height: 100vh;
  @media (max-width: 768px) {
    width: 100%;
  }
`;
