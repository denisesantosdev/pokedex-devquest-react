import React, { useContext, useEffect } from "react";
import { ThemeContext, themes } from "../contexts/context-theme";
import styled from "styled-components";

export function Header(props) {
  const { theme, setTheme, isChecked, setIsChecked } = useContext(ThemeContext);

  function handleOnChange(event) {
    setIsChecked(event.target.checked);
  }

  useEffect(() => {
    setTheme(isChecked ? themes.dark : themes.light);
  });

  useEffect(() => {
    localStorage.setItem("theme", isChecked);
  });

  return (
    <StyledHeader
      {...props}
      theme={theme}>
      <img
        src="./public/logo.svg"
        alt="Pokemon logo"
      />
      <Switch>
        <StyledInput
          type="checkbox"
          name=""
          id=""
          checked={isChecked}
          onChange={handleOnChange}
        />
        <Slider />
      </Switch>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  background-color: ${({ theme }) => theme.headerColor};
  color: ${({ theme }) => theme.textColor};
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  `;

const Switch = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  border-radius: 32px;
  border: 2px solid white;
  `;
  
  const Slider = styled.div`
  padding: 2px 5px;
  width: 60px;
  height: 32px;
  position: relative;
  
  &:before {
    content: "";
    position: absolute;
    width: 28px;
    height: 28px;
    border-radius: 35px;
    top: 50%;
    background: white;
    transform: translate(0, -50%);
  }
`;

const StyledInput = styled.input`
  opacity: 0;
  position: absolute;

  &:checked + ${Slider} {
  
    &:before {
    transform: translate(32px, -50%);
    }
    
  }
`;
