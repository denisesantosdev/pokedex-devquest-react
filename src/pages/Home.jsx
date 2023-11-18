import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { pokemonContext } from "../contexts/context-pokemon";

const Home = (props) => {
  const { pokemons, pokemonLimit, setPokemonLimit } =
    useContext(pokemonContext);
  //console.log(pokemons, pokemonLimit);
  const [filteredPokemons, setFilteredPokemon] = useState([]);
  const [showButton, setShowButton] = useState(true);

  useEffect(() => {
    setFilteredPokemon(pokemons);
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

    const option = pokemonTypes.map((item, index) => {
      return <option key={index}>{item}</option>;
    });

    return option;
  }

  function filterType(event) {
    const selectedType = event.target.value.toLowerCase();

    const filteredPokemons = pokemons.filter((item) => {
      if (selectedType === "todos") {
        return item;
      }
      return item.types.find((type) => type === selectedType);
    });

    if (selectedType !== "todos") {
      setShowButton(false);
    } else {
      setShowButton(true);
    }

    setFilteredPokemon(filteredPokemons);
  }

  return (
    <>
      <header>
        <img
          src="./src/assets/logo.svg"
          alt="Pokemon logo"
        />
        <div>
          <input
            type="checkbox"
            name=""
            id=""
          />
        </div>
      </header>
      <section>
        <div>
          <label htmlFor="searchPokemon"></label>
          <div>
            <input
              type="search"
              id="searchPokemon"
              placeholder="Pikachu"
            />
            <button>Search Pokemon</button>
          </div>
        </div>
      </section>
      <main>
        <div>
          <label htmlFor="pokemonType">Selecione tipo</label>
          <select
            id="pokemonType"
            onChange={filterType}>
            <option defaultValue={"Todos"}>Todos</option>
            {generateOptions()}
          </select>
        </div>
        {filteredPokemons.map((pokemon) => {
          return (
            <Link
              to={`/${pokemon.name}`}
              href="#"
              key={pokemon.id}>
              <div>
                <div>
                  <span>#{pokemon.id}</span>
                  <h2>{pokemon.name}</h2>
                </div>
                <img
                  src={pokemon.image}
                  alt="Pokemon image"
                />
              </div>
            </Link>
          );
        })}

        {showButton && (
          <button onClick={() => loadMore()}>Carregar mais</button>
        )}
      </main>
    </>
  );
};

export default Home;
