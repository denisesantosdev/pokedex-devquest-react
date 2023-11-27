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
  // console.log(pokemon);
  const [clickedPokemon, setClickedPokemon] = useState([]);

  const { pokemons } = useContext(pokemonContext);
  const { theme } = useContext(ThemeContext);
  //console.log("pokemons:", pokemons);

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

  //console.log(clickedPokemon);

  const abilityNames = clickedPokemon.abilities || [];
  //console.log("abilityNames:", abilityNames);

  useEffect(() => {
    async function fetchAbility() {
      const data = await getAbility(abilityNames);
      //console.log("data:", data);

      const descriptions = data.map((item) => {
        return item.effect_entries;
      });
      //console.log(descriptions);
    }

    fetchAbility();
  }, [abilityNames]);

  function displayTypes() {
    const types = clickedPokemon.types || [];
    //console.log(types);

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
            <h2>moves</h2>
            <ul>{displayMoves()}</ul>
          </PokemonMoves>
          <PokemonAbilities>
            <h2>abilities</h2>
            <ul>
              <li>
                <h3>name</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic
                  eum ipsum soluta a laudantium magnam porro laborum. Distinctio
                  reiciendis quisquam enim dolor ex odio, nihil mollitia! In et
                  ipsum exercitationem?
                </p>
              </li>
            </ul>
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
  }
`;

const PokemonDetails = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  background-color: ${({ theme }) => theme.backgroundColor};
  border-radius: 1rem;
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
  }
  
  
`;

export default PokemonDetail;

/* 
Imagem do pokemon
Nome
Lista de movimentos do pokemon (moves)
Lista de habilidades do pokemon (abilities)
a lista de habilidades deve apresentar o nome e o texto
descritivo da habilidade
Tipo do pokemon (type)
*/
