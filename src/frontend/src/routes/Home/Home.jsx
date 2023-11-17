import { Buscador } from '../../Components/Buscador/Buscador'
import { Categorias } from '../../Components/Categorias/Categorias'
import TypeIt from 'typeit-react'
import './home.css'
import Recomendaciones from '../../Components/Recomendaciones/recomendaciones'
import { useContext, useEffect } from 'react'
import { userContext } from '../../context/userContext'
import { Alert } from '@mui/material'

const Home = () => {

  const {userAlert, setUserAlert} = useContext(userContext)

  useEffect(() => {
    if (userAlert) {
      setTimeout(() => {
        setUserAlert(false)
      }, 5000)
    }
  }, [userAlert, setUserAlert])


  return (
    <>
    <div className='welcome-container'>
    {userAlert && (
      <Alert severity='success' 
      className='custom-alert'
      sx={{transition: "opacity 0.5s ease-in-out",
      width: '300px',
      margin: '0 auto',
      marginTop: '10px',
      position: 'absolute',
      top: '0',
      left: '5',
      }}>
        ¡Bienvenido a Pitch Please!
      </Alert>
    )}
      <div className='welcome-title-and-subtitle'>
        <TypeIt className="welcome-title" element={"h2"}>¡Bienvenido!</TypeIt> 
        <p className='welcome-subtitle'>En Pitch Please podrás alquilar el instrumento que estás buscando.</p>
      </div>
      <Buscador/>
    </div>
    
    <Categorias/>
    <Recomendaciones/>
    </>
  )
}

export default Home