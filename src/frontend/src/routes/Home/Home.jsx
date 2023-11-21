import { Buscador } from '../../Components/Buscador/Buscador'
import { Categorias } from '../../Components/Categorias/Categorias'
import TypeIt from 'typeit-react'
import './home.css'
import Recomendaciones from '../../Components/Recomendaciones/recomendaciones'
import { useContext, useEffect, useRef } from 'react'
import { userContext } from '../../context/userContext'
import { Alert } from '@mui/material'
import { useState } from 'react'
import ProductoCard from '../../Components/ProductoCard/ProductoCard'

const Home = () => {

  const searchResultsRef = useRef(null);

  const {userAlert, setUserAlert} = useContext(userContext)
  const [searchResults, setSearchResults] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  const handleSearchQuery = (query) => {
    setSearchQuery(query);
  }

  const scrollToResults = () => {
    if (searchResultsRef.current) {
      searchResultsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
      sx={{transition: "opacity 0.5s ease-in-out", // no funca la animación :/
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
      <Buscador onSearch={handleSearchResults} onSearchQuery={handleSearchQuery} scrollToResults={scrollToResults}/>
    </div>
    
    <Categorias/>
    {searchResults && searchResults.length > 0 ? (
      <div ref={searchResultsRef}>
        <h3 className="search-results-title">Resultados de la búsqueda:</h3>
        <p className="search-results-subtitle">Aquí se van a visualizar los resultados para {searchQuery}</p>
        <div className='search-results-container'>
          {searchResults.map((producto) => {
            if (producto && producto.nombre) {
              return (
                <ProductoCard key={producto.id} producto={producto} />
              )
            } else {
              return null;
            }
          })}
        </div>
      </div>
    ) : (
      searchResults.length === 0 && searchQuery !== "" ? (
        <Alert severity='error'
        sx={{margin: '0 auto',
        textAlign: 'center',
        width: '500px',
        marginBottom: '50px'}}>
          No se encontraron resultados para {searchQuery}
        </Alert>
    ) : (
      <Recomendaciones/>
    )
  )}
  </>
  )
}

export default Home