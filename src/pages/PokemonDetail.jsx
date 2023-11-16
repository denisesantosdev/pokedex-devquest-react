import { Link, useParams } from "react-router-dom";
import { getAbility } from "../services/pokemon-ability-service";
import { useEffect } from "react";

const PokemonDetail = (props) => {
  const { pokemon } = useParams();
  //console.log(props.pokemonsData);

  const clickedPokemon = props.pokemonsData.find((item) => {
    return item.name === pokemon;
  });

  const abilityNames = clickedPokemon.abilities;
  //console.log("abilityNames:", abilityNames);

  useEffect(() => {
    async function fetchAbility() {
      const data = await getAbility(abilityNames);
      console.log('data:', data)
    }

    fetchAbility();
  }, []);

  //console.log(types);
  const types = clickedPokemon.types.map((item, index) => {
    return <p key={index}>{item}</p>;
  });

  const moves = clickedPokemon.moves.map((item, index) => {
    return <li key={index}>{item}</li>;
  });

  return (
    <main>
      <div>
        <Link to={"/"}>Voltar</Link>
        <h1>{clickedPokemon.name}</h1>
        <img
          src={clickedPokemon.image}
          alt={clickedPokemon.name}
        />
        <div>{types}</div>
      </div>
      <section>
        <div>
          <h2>
            moves <span>{moves.length}</span>
          </h2>
          <ul>{moves}</ul>
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
