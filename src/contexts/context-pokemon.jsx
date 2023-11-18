import { createContext, useState, useEffect } from "react";

import { getPokemons } from "../services/pokemon-service";

export const pokemonContext = createContext({});

export const PokemonProvider = (props) => {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonLimit, setPokemonLimit] = useState(11);

  useEffect(() => {
    async function fetchPokemons() {
      const pokemonData = await getPokemons(1, pokemonLimit);

      const transformedData = pokemonData.map((item) => {
        return {
          id: item.id,
          abilities: item.abilities.map((ability) => {
            return ability.ability.name;
          }),
          moves: item.moves.map((move) => {
            return move.move.name;
          }),
          name: item.name,
          types: item.types.map((type) => {
            return type.type.name;
          }),
          image: item.sprites.front_default,
        };
      });

      setPokemons(transformedData);
    }

    fetchPokemons();
  }, [pokemonLimit]);

  //console.log(pokemons, pokemonLimit);

  return (
    <pokemonContext.Provider value={{ pokemons, pokemonLimit, setPokemonLimit }}>
      {props.children}
    </pokemonContext.Provider>
  );
};
