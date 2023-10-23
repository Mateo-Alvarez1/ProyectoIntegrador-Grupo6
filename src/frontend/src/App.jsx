import './App.css'
import './Components/Header/header.css'
import Header from './Components/Header/Header'
import Footer from "./Components/Footer/Footer"
import { Categorias } from './Components/Categorias/Categorias'
import { Buscador } from './Components/Buscador/Buscador'
import { Recomendaciones } from './Components/Recomendaciones/recomendaciones'
import { Route, Routes } from 'react-router-dom'
import Admin from './pages/Admin/Admin'

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
