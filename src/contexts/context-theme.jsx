import { createContext, useState } from "react";

export const themes = {
  light: {
    backgroundColor: "#EFEFEF",
    backgroundColorBody: "#EFEFEF",
    textColor: "#1D1D1D",
    headerColor: "#DC0A2D",
  },
  
  dark: {
    backgroundColor: "#333333",
    backgroundColorBody: "#1D1D1D",
    textColor: "#EFEFEF",
    headerColor: "#333333",
  },
};

export const pokemonTypeColors = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD"
};

export const ThemeContext = createContext({});

export const ThemeProvider = (props) => {
  // console.log('savedTheme:', savedTheme)

  const [theme, setTheme] = useState(themes.light);

  const [isChecked, setIsChecked] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );

  //console.log('theme:', theme)

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isChecked, setIsChecked }}>
      {props.children}
    </ThemeContext.Provider>
  );
};
