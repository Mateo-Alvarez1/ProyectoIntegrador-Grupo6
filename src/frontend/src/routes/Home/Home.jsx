import { Buscador } from '../../Components/Buscador/Buscador'
import { Categorias } from '../../Components/Categorias/Categorias'
import { Recomendaciones } from '../../Components/Recomendaciones/recomendaciones'
import './home.css'

const Home = () => {
  return (
    <>
    <div className='welcome-container'>
      <h2 className='welcome-title'>¡Bienvenido!</h2>
      <p>En Pitch Please podrás alquilar el instrumento que estás buscando.</p>
    </div>
    <Buscador/>
    <Categorias/>
    <Recomendaciones/>
    </>
  )
}

export default Home