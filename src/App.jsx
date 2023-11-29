import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";

import "./App.css";

import Home from "./pages/Home";
import PokemonDetail from "./pages/PokemonDetail";

import { getPokemons } from "./services/pokemon-service";
import { useEffect } from "react";

import { PokemonProvider } from "./contexts/context-pokemon";
import { ThemeProvider } from "./contexts/context-theme";

import { createGlobalStyle } from "styled-components";
import { ThemeContext } from "./contexts/context-theme";
import styled from "styled-components";

function App(props) {
  const { theme } = useContext(ThemeContext);

  return (
    <BrowserRouter>
      <PokemonProvider>
        <ThemeProvider>
          <GlobalStyle
            {...props}
            theme={theme}
          />
          <Routes>
            <Route
              exact
              path="/"
              element={<Home />}
            />
            <Route
              exact
              path="/:pokemon"
              element={<PokemonDetail />}
            />
          </Routes>
        </ThemeProvider>
      </PokemonProvider>
    </BrowserRouter>
  );
}

const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    /* outline: 1px solid red; */
    text-transform: capitalize;
  }

  body {
    font-family: sans-serif;
  }
  `;

export default App;
