import './App.css'
import './Components/Header/header.css'
import Header from './Components/Header/Header'
import { Categorias } from './Components/Categorias/Categorias'
import { Buscador } from './Components/Buscador/Buscador'

function App() {

  return (
    <>
      <Header/>
      {/* <Buscador/> */}
      <Categorias/>
    </>
  )
}

export default App
