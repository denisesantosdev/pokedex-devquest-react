import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

import Home from "./pages/Home";
import PokemonDetail from "./pages/PokemonDetail";

import { PokemonProvider } from "./contexts/context-pokemon";
import { ThemeProvider } from "./contexts/context-theme";

import { createGlobalStyle } from "styled-components";

function App() {

  return (
    <BrowserRouter>
      <PokemonProvider>
        <ThemeProvider>
          <GlobalStyle />
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
    text-transform: capitalize;
  }

  body {
    font-family: sans-serif;
  }
  `;

export default App;
