import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import "./App.css";

import Home from "./pages/Home";
import PokemonDetail from "./pages/PokemonDetail";

import { getPokemons } from "./services/pokemon-service";
import { useEffect } from "react";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonLimit, setPokemonLimit] = useState(11);

  useEffect(() => {
    async function fetchPokemons() {
      const pokemonData = await getPokemons(1, pokemonLimit);

      const transformedData = pokemonData.map((item) => {
        return {
          id: item.id,
          abilities: item.abilities.map(ability=>{
            return ability.ability.name
          }),
          moves: item.moves.map(move=>{
            return move.move.name
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

  return (
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Home
                pokemonsData={pokemons}
                pokemonLimit={pokemonLimit}
                setPokemonLimit={setPokemonLimit}
              />
            }
          />
          <Route
            exact
            path="/:pokemon"
            element={<PokemonDetail pokemonsData={pokemons}/>}
          />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
