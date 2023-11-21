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
  const [theme, setTheme] = useState(themes.light);
  const [isChecked, setIsChecked] = useState(false);

  //console.log('theme:', theme)

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isChecked, setIsChecked }}>
      {props.children}
    </ThemeContext.Provider>
  );
};
