import { Buscador } from '../../Components/Buscador/Buscador'
import { Categorias } from '../../Components/Categorias/Categorias'
import TypeIt from 'typeit-react'
import './home.css'
import Recomendaciones from '../../Components/Recomendaciones/recomendaciones'

const Home = () => {
  return (
    <>
    <div className='welcome-container'>
      <TypeIt className="welcome-title" element={"h2"}>¡Bienvenido!</TypeIt> 
      <p className='welcome-subtitle'>En Pitch Please podrás alquilar el instrumento que estás buscando.</p> 
    </div>
    
    <Buscador/>
    <Categorias/>
    <Recomendaciones/>
    </>
  )
}

export default Home