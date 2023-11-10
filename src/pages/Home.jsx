import { useEffect, useState } from "react";

async function getPokemons(offset, limit) {
  const pokemonPromises = [];

  for (let i = offset; i < limit; i++) {
    pokemonPromises.push(
      fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
        .then((response) => response.json())
        .then((data) => data)
        .catch((error) => console.error(error))
    );
  }

  return await Promise.all(pokemonPromises);
}

const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonLimit, setPokemonLimit] = useState(11);
  const [pokemonOffset, setPokemonOffset] = useState(1);

  useEffect(() => {
    const fetchPokemons = async () => {
      const result = await getPokemons(pokemonOffset, pokemonLimit);

      const transformedData = result.map((item) => {
        return {
          id: item.id,
          abilities: item.abilities,
          moves: item.moves,
          name: item.name,
          types: item.types,
          sprites: {
            front_default: item.front_default,
          },
        };
      });

      setPokemons(transformedData);
    };

    fetchPokemons();
  }, [pokemonLimit, pokemonOffset]);

  function loadMore() {
    setPokemonLimit((prev) => prev + 10);
    //setPokemonOffset((prev) => prev + 10);
  }

  return (
    <>
      <header>
        {console.log(pokemons)}
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
          <select id="pokemonType">
            <option defaultValue={"Todos"}>Todos</option>
            <option>Pokemon type 1</option>
          </select>
        </div>
        <a href="#">
          <div>
            <img
              src=""
              alt="Pokemon image"
            />
            <h2>Pokemon name</h2>
          </div>
        </a>
        <button onClick={() => loadMore()}>Carregar mais</button>
      </main>
    </>
  );
};

export default Home;
