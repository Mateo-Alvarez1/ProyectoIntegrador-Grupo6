import React from 'react'
import {Link, useParams } from 'react-router-dom'
import arrow from "../../assets/arrow.svg"
import "./Producto.css"
import Guitarra from "../../assets/GuitarraClasica.jpg"

const Producto = () => {

const {productoId} = useParams();



  return (
    <>
    <div className='subHeader'>
        <h2>{productoId}</h2>
        <Link to="/" className='textArrow'>Volver al Inicio <img src={arrow} alt="" /></Link>
    </div>
    <div className='imageContainer'>

        <div>
        <div className='containerImagenPrincipal'> <img src={Guitarra}  alt="" /></div>
        </div>
       <div className='containerSecundarias'>
        <div className="containerSecundarias1">
        <div className='imagen2'> <img src={Guitarra}  alt="" /></div>
        <div className='imagen3'> <img src={Guitarra}  alt="" /></div>

        </div>

        <div className='containerSecundarias2'>
        <div className='imagen4'> <img src={Guitarra}  alt="" /></div>
        <div className='imagen5'> <img src={Guitarra}  alt="" /></div>
        </div>

       </div>
  
      
    </div>
    </>
  )
}

export default Producto