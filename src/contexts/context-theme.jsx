import { createContext, useState } from "react";

export const themes = {
  light: {
    background: "red",
  },

  dark: {
    background: "black",
  },
};

export const ThemeContext = createContext({});

export const ThemeProvider = (props) => {
   // console.log('savedTheme:', savedTheme)

  const [theme, setTheme] = useState(themes.light);

  const [isChecked, setIsChecked] = useState(
    JSON.parse(localStorage.getItem('theme'))
    );

  //console.log('theme:', theme)

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isChecked, setIsChecked }}>
      {props.children}
    </ThemeContext.Provider>
  );
};
