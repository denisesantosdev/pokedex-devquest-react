export async function getPokemons(offset, limit) {
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