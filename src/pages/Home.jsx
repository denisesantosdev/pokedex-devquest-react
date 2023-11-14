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
  const [filteredPokemons, setFilteredPokemon] = useState([]);
  const [showButton, setShowButton] = useState(true);
  const [pokemonLimit, setPokemonLimit] = useState(11);
  const [pokemonOffset, setPokemonOffset] = useState(1);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const result = await getPokemons(pokemonOffset, pokemonLimit);

        const transformedData = result.map((item) => {
          return {
            id: item.id,
            abilities: item.abilities,
            moves: item.moves,
            name: item.name,
            types: item.types.map((type) => {
              return type.type.name;
            }),
            image: item.sprites.front_default,
          };
        });

        setPokemons(transformedData);
        setFilteredPokemon(transformedData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPokemons();
  }, [pokemonLimit, pokemonOffset]);

  function loadMore() {
    setPokemonLimit((prev) => prev + 10);
    //setPokemonOffset((prev) => prev + 10);
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
    const chosenType = event.target.value.toLowerCase();

    const filteredPokemons = pokemons.filter((item) => {
      if (chosenType === "todos") {
        return item;
      }
      return item.types.find((type) => type === chosenType);
    });

    if (chosenType !== "todos") {
      setShowButton(false);
    } else {
      setShowButton(true);
    }

    setFilteredPokemon(filteredPokemons);
  }

  return (
    <>
      <header>
        {/*  {console.log(pokemons)} */}
        {/*  {console.log(chosenType)} */}
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
            <a
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
            </a>
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
