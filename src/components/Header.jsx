import React, { useContext, useEffect } from "react";
import { ThemeContext, themes } from "../contexts/context-theme";

export function Header() {
  const { theme, setTheme, isChecked, setIsChecked } = useContext(ThemeContext);

  function handleOnChange(event) {
    setIsChecked(event.target.checked);
  }

  useEffect(()=>{
    setTheme(isChecked ? themes.dark : themes.light);
  })

  useEffect(()=>{
    localStorage.setItem('theme', isChecked)
  })

  return (
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
          checked={isChecked}
          onChange={handleOnChange}
        />
      </div>
    </header>
  );
}
