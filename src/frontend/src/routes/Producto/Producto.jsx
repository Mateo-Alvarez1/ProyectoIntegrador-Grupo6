import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import arrow from "../../assets/arrow.svg";
import "./Producto.css";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const Producto = () => {
  const { productoId } = useParams();
  const URLINSTRUMENTO= ` http://localhost:8080/api/v1/instrumentos/${productoId}` 
  const [producto, setProducto] = useState(null);
  const [isOpen, setIsOpen] = useState(false);


  const buscarInstrumento= ()=>{

    fetch(URLINSTRUMENTO).
    then(response=>response.json()).
    then(data=>{
      setProducto(data);
  
      
    })
  
  }

  useEffect(()=>{
    buscarInstrumento();
  },[producto])
 



  return (
    <>
      <div className='subHeader'>
        {producto && <h2>{producto.nombre}</h2>}
        <Link to="/" className='textArrow'>
          Volver al Inicio <img src={arrow} alt="" />
        </Link>
      </div>

      <div className='containerProducto'>
        <div className='imageContainer'>
          <div>
            <div className='containerImagenPrincipal'>
              {producto && <img src={producto.imagenes[0]} alt={producto.nombre} />}
            </div>
          </div>
          <div className='containerSecundarias'>
            <div className="containerSecundarias1">
              <div className='imagen2'>
                {producto && <img src={producto.imagenes[0]} alt={producto.nombre} />}
              </div>
              <div className='imagen3'>
                {producto && <img src={producto.imagenes[0]} alt={producto.nombre} />}
              </div>
            </div>
            <div className='containerSecundarias2'>
              <div className='imagen4'>
                {producto && <img src={producto.imagenes[0]} alt={producto.nombre} />}
              </div>
              <div className='imagen5'>
                {producto && <img src={producto.imagenes[0]} alt={producto.nombre} />}
              </div>
            </div>
          </div>
        </div>



        {producto && (<div className='gallery-container'>
        <button type="button" className='gallery-button' onClick={() => setIsOpen(true)}>
          Ver más
        </button>

        <Lightbox
          open={isOpen}
          close={() => setIsOpen(false)}
          slides={[
            { src: producto.imagenes[0] },
            { src: producto.imagenes[0] },
            { src: producto.imagenes[0] },
            { src: producto.imagenes[0] },
            { src: producto.imagenes[0] }
          ]}
        />
      </div>
      )}

      </div>


      <div className='specsProducto'>
      {producto && (
            <>
                  <h2>Especificaciones técnicas</h2>

              <p>Categoría: {producto.categoria.nombre}</p>
              <p>Precio: USD {producto.precio}</p>
              <p>Marca: {producto.marca.nombre}</p>
            </>
          )}
      </div>

    </>
  );
};

export default Producto;
