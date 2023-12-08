import { useState, useEffect, useContext } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import arrow from "../../assets/arrow.svg";
import "./Producto.css";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { userContext } from '../../context/userContext';

const Producto = () => {
  const { productoId } = useParams();
  const URLINSTRUMENTO= ` http://localhost:8080/api/v1/instrumentos/${productoId}` ;
  const BUCKETURL="https://1023c01grupo6.s3.amazonaws.com";
  const [producto, setProducto] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const userContextResults = useContext(userContext)
  const token = userContextResults.userJwt ? userContextResults.userJwt : null;

  const navigate = useNavigate();

  useEffect(() => {  
    const fetchProducto = async () => {
      try {
        const response = await fetch(URLINSTRUMENTO);
        if (response.ok) {
          const data = await response.json();
          setProducto(data);
        } else {
          throw new Error('Error al obtener el producto');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    fetchProducto();
  }, [productoId]);

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
          slides={producto && producto.imagenes.map(imagen => ({ src: `${BUCKETURL}/${imagen}` }))}
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
        <div className='botonReserva' >
          <button className="cardLink" onClick={() => {
            token ? navigate(`/reservas/${productoId}`) : navigate('/login?reservationAlert=true')
          }}>
            ¡Haz una reserva!
            </button>
        </div>
      </div>

    </>
  );
};

export default Producto;
