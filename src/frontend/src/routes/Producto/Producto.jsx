import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import arrow from "../../assets/arrow.svg";
import "./Producto.css";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const Producto = () => {
  const { productoId } = useParams();
  const URLINSTRUMENTO= ` http://localhost:8080/api/v1/instrumentos/${productoId}` ;
  const BUCKETURL="https://1023c01grupo6.s3.amazonaws.com";
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
              {producto && <img src={`${BUCKETURL}/${producto.imagenes[0]}`} alt={producto.nombre} />}
            </div>
          </div>
          <div className='containerSecundarias'>
            <div className="containerSecundarias1">
              <div className='imagen2'>
                {producto && <img src={`${BUCKETURL}/${producto.imagenes[1]}`} alt={producto.nombre} />}
              </div>
              <div className='imagen3'>
                {producto && <img src={`${BUCKETURL}/${producto.imagenes[2]}`} alt={producto.nombre} />}
              </div>
            </div>
            <div className='containerSecundarias2'>
              <div className='imagen4'>
                {producto && <img src={`${BUCKETURL}/${producto.imagenes[3]}`} alt={producto.nombre} />}
              </div>
              <div className='imagen5'>
                {producto && <img src={`${BUCKETURL}/${producto.imagenes[4]}`} alt={producto.nombre} />}
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
            { src: `${BUCKETURL}/${producto.imagenes[0]}` },
            { src: `${BUCKETURL}/${producto.imagenes[1]}` },
            { src: `${BUCKETURL}/${producto.imagenes[2]}` },
            { src: `${BUCKETURL}/${producto.imagenes[3]}` },
            { src: `${BUCKETURL}/${producto.imagenes[4]}` }
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
              <div className='caracteristicas'>
              <h3>Características:</h3>
              <ul>
                <li>Color: {producto.color}</li>
                <li>Stock: {producto.stock}</li>
              </ul>
              </div>
            </>
          )}
        <div className='botonReserva'>
          <Link className="cardLink" to={`/reservas/${productoId}`}>¡Haz una reserva!</Link>
        </div>
      </div>

    </>
  );
};

export default Producto;
