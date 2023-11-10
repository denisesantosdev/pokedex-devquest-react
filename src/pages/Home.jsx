import { useEffect, useState } from "react";

async function getPokemons(id) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

  return await response.json();
}

const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  let pokemonLimit = 11

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const pokemonPromises = [];

        for (let i = 1; i < pokemonLimit; i++) {
          pokemonPromises.push(getPokemons(i)); 
        }
  
        const results = await Promise.all(pokemonPromises);
  
        /* setPokemons(() => {
          results.map((item) => {
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
        }); */
        setPokemons(results)
      } catch {
        console.error('Error fetching data:', error);
      }
      
    };

    fetchPokemons();
    loadMore()
    
  }, []);

  function loadMore() {
    pokemonLimit += 11
    console.log(pokemonLimit);
    console.log(pokemons); 
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
        <button onClick={()=>loadMore()}>Carregar mais</button>
      </main>
    </>
  );
};

export default Home;
