import './App.css'
import './Components/Header/header.css'
import Header from './Components/Header/Header'
import Footer from "./Components/Footer/Footer"
import { Categorias } from './Components/Categorias/Categorias'
import { Buscador } from './Components/Buscador/Buscador'
import { Recomendaciones } from './Components/Recomendaciones/recomendaciones'


function App() {

  return (
    <>


      <Header/>
      <Buscador/> 
      <Categorias/>
      <Recomendaciones/>
      <Footer/>

    </>
  )
}

export default App
