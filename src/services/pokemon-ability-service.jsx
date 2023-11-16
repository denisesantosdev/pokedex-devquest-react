export async function getAbility(abilities) {
  const abilityPromises = [];

  for (let item of abilities) {
    abilityPromises.push(
      fetch(`https://pokeapi.co/api/v2/ability/${item}/`)
        .then((response) => response.json())
        .then((data) => data)
        .catch((error) => console.error(error))
    );
  }

  return await Promise.all(abilityPromises);
}
