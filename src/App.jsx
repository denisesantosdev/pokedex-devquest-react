import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'

import  Home  from './pages/Home'
import PokemonDetail from './pages/PokemonDetail'

function App() {

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/:pokemon' element={<PokemonDetail/>}/>
      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
