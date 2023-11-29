import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ThemeContext } from "../contexts/context-theme";
import { pokemonTypeColors } from "../contexts/context-theme";

export function PokemonCard(props) {
  const { theme } = useContext(ThemeContext);

  const type = props.pokemon.types[0];

  return (
    <StyledLink
      to={`/${props.pokemon.name}`}
      href="#">
      <StyledDiv
        {...props}
        theme={theme}
        type={type}>
        <CardHeader>
          <span>#{props.pokemon.id}</span>
          <h2>{props.pokemon.name}</h2>
        </CardHeader>

        <div>
          <img
            src={props.pokemon.image}
            alt="Pokemon image"
          />
        </div>
      </StyledDiv>
    </StyledLink>
  );
}

const StyledDiv = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor};
  color: ${({ theme }) => theme.textColor};
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  position: relative;
  overflow: hidden;

  & div {
    display: flex;
    justify-content: center;
    position: relative;
    z-index: 1;
  }

  &:after {
  content: '';
  position: absolute;
  left: -40px;
  bottom: -90px;
  background-color: ${({ type }) => pokemonTypeColors[type]};
  border-radius: 100%;
  width: 120%;
  height: 100%;
  z-index: 0;
  }

  &:hover {
    translate: 0 -10px;
  }
  `;

const CardHeader = styled.header`
  display: flex;
  gap: 1rem;
  align-items: center;
  text-transform: capitalize;
  position: relative;
  z-index: 3;
  `;
  
const StyledLink = styled(Link)`
  text-decoration: none
  `;
