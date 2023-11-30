import React, { useContext, useEffect, useState } from "react";

import { pokemonContext } from "../contexts/context-pokemon";
import { ThemeContext } from "../contexts/context-theme";

import { Header } from "../components/Header";
import { PokemonCard } from "../components/PokemonCard";

import styled from "styled-components";
import { createGlobalStyle } from "styled-components";

const Home = (props) => {
  const { pokemons, setPokemonLimit } = useContext(pokemonContext);

  const { theme } = useContext(ThemeContext);

  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [showButton, setShowButton] = useState(true);

  useEffect(() => {
    setFilteredPokemons(pokemons);
  }, [pokemons]);

  function loadMore() {
    setPokemonLimit((prev) => prev + 10);
  }

  function generateOptions() {
    const pokemonTypes = [
      "Normal",
      "Fire",
      "Water",
      "Electric",
      "Grass",
      "Ice",
      "Fighting",
      "Poison",
      "Ground",
      "Flying",
      "Psychic",
      "Bug",
      "Rock",
      "Ghost",
      "Dragon",
      "Dark",
      "Steel",
      "Fairy",
    ];

    const options = pokemonTypes.map((type, index) => {
      return <option key={index}>{type}</option>;
    });

    return options;
  }

  function filterType(event) {
    const selectedType = event.target.value.toLowerCase();

    const filteredPokemons = pokemons.filter((pokemon) => {
      if (selectedType === "todos") {
        return pokemon;
      }
      return pokemon.types.find((type) => type === selectedType);
    });

    if (selectedType !== "todos") {
      setShowButton(false);
    } else {
      setShowButton(true);
    }

    setFilteredPokemons(filteredPokemons);
  }

  return (
    <>
      <GlobalStyle
        {...props}
        theme={theme}
      />
      <Header />

      <Main>

        <PokemonFilter
          {...props}
          theme={theme}>
          <label htmlFor="pokemonType">Selecione tipo</label>
          <select
            id="pokemonType"
            onChange={filterType}>
            <option defaultValue={"Todos"}>Todos</option>
            {generateOptions()}
          </select>
        </PokemonFilter>

        <PokemonSection>
          {filteredPokemons.map((pokemon) => {
            return (
              <PokemonCard
                pokemon={pokemon}
                key={pokemon.id}
              />
            );
          })}
        </PokemonSection>

        {showButton && (
          <LoadMoreButton
            {...props}
            theme={theme}
            onClick={() => loadMore()}>
            Carregar mais
          </LoadMoreButton>
        )}

      </Main>
    </>
  );
};

const GlobalStyle = createGlobalStyle`
  body {
    background-color:${({ theme }) => theme.backgroundColorBody};
  } 
  `;

const Main = styled.main`
  max-width: 1000px;
  margin: auto;
  margin-top: 3rem;
  display: grid;
  `;

const PokemonFilter = styled.div`;
  max-width: fit-content;
  margin: auto;
  padding: 1rem;
  color: ${({ theme }) => theme.textColor};
  border-radius: 1rem;
  border: 1px solid ${({ theme }) => theme.textColor};
  margin-bottom: 1rem;
  
  & select {
    background-color: ${({ theme }) => theme.backgroundColorBody};
    color: ${({ theme }) => theme.textColor};
    border: none;
    margin-left: 20px;
    font-size: 1rem;
    font-weight: bold;
  }
`;

const PokemonSection = styled.section`
  display: grid;
  justify-content:center;
  grid-template-columns: repeat(auto-fit, minmax(150px, 200px));
  gap: 1rem;
  padding: 1rem;
`;

const LoadMoreButton = styled.button`
  background-color: ${({ theme }) => theme.btnColor};
  color: white;
  padding: .5rem 1rem;
  border-radius: 1rem;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  width: fit-content;
  margin: 1rem auto;
  cursor: pointer;
`;

export default Home;
