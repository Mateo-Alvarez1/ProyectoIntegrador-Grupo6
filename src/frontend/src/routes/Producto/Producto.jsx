import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import arrow from "../../assets/arrow.svg";
import "./Producto.css";
import Productos from "../../utils/products.json";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Puntuacion from "../../Components/Puntuación/Puntuacion";

const Producto = () => {
  const [producto, setProducto] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [puntuacion, setPuntuacion] = useState(0);
  const { productoId } = useParams();


  useEffect(() => {
    const foundProduct = Productos.find((product) => product.id == productoId);
    if (foundProduct) {
      setProducto(foundProduct);
    }
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
              {producto && <img src={producto.imagen} alt={producto.nombre} />}
            </div>
          </div>
          <div className='containerSecundarias'>
            <div className="containerSecundarias1">
              <div className='imagen2'>
                {producto && <img src={producto.imagen} alt={producto.nombre} />}
              </div>
              <div className='imagen3'>
                {producto && <img src={producto.imagen} alt={producto.nombre} />}
              </div>
            </div>
            <div className='containerSecundarias2'>
              <div className='imagen4'>
                {producto && <img src={producto.imagen} alt={producto.nombre} />}
              </div>
              <div className='imagen5'>
                {producto && <img src={producto.imagen} alt={producto.nombre} />}
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
            { src: producto.imagen },
            { src: producto.imagen },
            { src: producto.imagen },
            { src: producto.imagen },
            { src: producto.imagen }
          ]}
        />
      </div>
      )}

      </div>


      <div className='specsProducto'>
      {producto && (
            <>
                  <h2>Especificaciones técnicas</h2>

              <p>Categoría: {producto.categoria}</p>
              <p>Precio: USD {producto.precio}</p>
              <p>Marca: {producto.marca}</p>
              
            </>
          )}
      </div>
      <div className="puntuacion-container">
      <Puntuacion onPuntuacionSubmit={setPuntuacion} />
      </div>
    </>
  );
};

export default Producto;

