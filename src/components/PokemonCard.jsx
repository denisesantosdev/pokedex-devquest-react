import { Link } from "react-router-dom";

export function PokemonCard(props) {
  return (
    <Link
      to={`/${props.pokemon.name}`}
      href="#"
      >
      <div>
        <div>
          <span>#{props.pokemon.id}</span>
          <h2>{props.pokemon.name}</h2>
        </div>
        <img
          src={props.pokemon.image}
          alt="Pokemon image"
        />
      </div>
    </Link>
  );
}
