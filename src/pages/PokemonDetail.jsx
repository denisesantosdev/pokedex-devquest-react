import { Link, useParams } from "react-router-dom";
import { getAbility } from "../services/pokemon-ability-service";
import { useContext, useEffect, useState } from "react";
import { pokemonContext } from "../contexts/context-pokemon";
import { Header } from "../components/header";
import { createGlobalStyle, styled } from "styled-components";
import { ThemeContext, pokemonTypeColors } from "../contexts/context-theme";

const PokemonDetail = (props) => {
  const savedPokemon = JSON.parse(localStorage.getItem("clickedPokemon"));

  const { pokemon } = useParams();
  
  const [clickedPokemon, setClickedPokemon] = useState([]);

  const { pokemons } = useContext(pokemonContext);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    setClickedPokemon(
      pokemons.find((item) => {
        return item.name === pokemon;
      }) || savedPokemon
    );
  }, [pokemons]);

  useEffect(() => {
    localStorage.setItem("clickedPokemon", JSON.stringify(clickedPokemon));
  }, [clickedPokemon]);

  const abilityNames = clickedPokemon.abilities || [];

  const [abilities, setAbilities] = useState([]);
  
  useEffect(() => {
    async function fetchAbility() {
      const data = await getAbility(abilityNames);

      const transformedData = data.map((item) => {
        return {
          name: item.name,
          description: item.effect_entries.filter((item) => {
            if (item.language.name === "en") {
              return item;
            }
          }),
        };
      });

      setAbilities(transformedData);
    }

    fetchAbility();
  }, [clickedPokemon]);

  function displayTypes() {
    const types = clickedPokemon.types || [];

    return types.map((item, index) => {
      return (
        <p
          style={{ backgroundColor: `${pokemonTypeColors[item]}` }}
          key={index}>
          {item}
        </p>
      );
    });
  }

  function displayMoves() {
    const moves = clickedPokemon.moves || [];

    return moves.map((item, index) => {
      return <li key={index}>{item}</li>;
    });
  }

  function displayAbilities() {
    return abilities.map((item) => {
      return (
        <>
          <li>{item.name}</li>
          <p>{item.description[0].effect}</p>
        </>
      );
    });
  }

  return (
    <>
      <Header />

      <GlobalStyle
        {...props}
        theme={theme}
      />

      <Main
        {...props}
        theme={theme}>
        <BackBtn
          to={"/"}
          {...props}
          theme={theme}>
          Voltar
        </BackBtn>
        <Pokemon>
          <h1>{clickedPokemon.name}</h1>
          <img
            src={clickedPokemon.image}
            alt={clickedPokemon.name}
          />
          <Types>{displayTypes()}</Types>
        </Pokemon>
        <PokemonDetails
          {...props}
          theme={theme}>
          <PokemonMoves>
            <h2>
              {" "}
              <span>{clickedPokemon.moves?.length}</span> moves
            </h2>
            <ul>{displayMoves()}</ul>
          </PokemonMoves>
          <PokemonAbilities>
            <h2>
              <span>{abilities.length}</span> abilities
            </h2>
            <ul>{displayAbilities()}</ul>
          </PokemonAbilities>
        </PokemonDetails>
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
  gap: 3rem;
  justify-items: center;
  padding: 1rem;
  color: ${({ theme }) => theme.textColor};
  position: relative;
  
  `;

const BackBtn = styled(Link)`
    text-decoration: none;
    background-color: ${({ theme }) => theme.btnColor};
    color: white;
    font-weight: bold;
    border-radius: 20px;
    justify-self: start;
    padding: .5rem 1rem;
  `;

const Pokemon = styled.div`
  display: grid;
  justify-items: center;
  gap: 1rem;
  `;

const Types = styled.div`
  display: flex;
  gap: 1rem;

  & p {
    padding: .5rem 1rem;
    border-radius: .5rem;
    font-weight: bold;
  }
`;

const PokemonDetails = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  background-color: ${({ theme }) => theme.backgroundColor};
  border-radius: 1rem;
  padding: 1rem;
box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

  `;

const PokemonMoves = styled.div`
height: 300px;
overflow-y: scroll;
padding: 1rem;

& h2 {
  margin-bottom: 1rem;
}

& li {
  display: list-item;
  list-style-type: none;
  padding: .5rem;
  font-size: .8rem;
  }
  
  `;

const PokemonAbilities = styled.div`
  height: 300px;
  overflow-y: scroll;
padding: 1rem;

& h2 {
  margin-bottom: 1rem;
}

  & li {
    display: list-item;
    list-style-type: none;
    padding: .5rem;
    margin-top: 1rem;
    font-weight: bold;
  }

  & p {
    margin-top: 1rem;
    line-height: 1.4;
    font-size: .8rem;
    text-transform: initial;
  }
  
  
`;

export default PokemonDetail;
