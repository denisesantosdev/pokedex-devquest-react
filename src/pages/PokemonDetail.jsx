import { Link, useParams } from "react-router-dom";
import { getAbility } from "../services/pokemon-ability-service";
import { useContext, useEffect, useState } from "react";
import { pokemonContext } from "../contexts/context-pokemon";

const PokemonDetail = () => {
  const savedPokemon = JSON.parse(localStorage.getItem("clickedPokemon"));

  const { pokemon } = useParams();
  // console.log(pokemon);
  const [clickedPokemon, setClickedPokemon] = useState([]);

  const { pokemons } = useContext(pokemonContext);
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
      //console.log('data:', data)
    }

    fetchAbility();
  }, [abilityNames]);

  function displayTypes() {
    const types = clickedPokemon.types || [];
    console.log(types);

    return types.map((item, index) => {
      return <p key={index}>{item}</p>;
    });
  }

  function displayMoves() {
    const moves = clickedPokemon.moves || [];

    return moves.map((item, index) => {
      return <li key={index}>{item}</li>;
    });
  }

  return (
    <main>
      <div>
        <Link to={"/"}>Voltar</Link>
        <h1>{clickedPokemon.name}</h1>
        <img
          src={clickedPokemon.image}
          alt={clickedPokemon.name}
        />
        <div>{displayTypes()}</div>
      </div>
      <section>
        <div>
          <h2>moves</h2>
          <ul>{displayMoves()}</ul>
        </div>
        <div>
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
        </div>
      </section>
    </main>
  );
};

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
