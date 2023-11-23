import { Link } from "react-router-dom";

const ProductoCard = ({ producto }) => {

  const BUCKETURL="https://1023c01grupo6.s3.amazonaws.com";
  
console.log(producto);
  return (
    <div className="recomendacionesCard" >
        <h3>{producto.nombre}</h3>
        <p>Precio: USD {producto.precio}</p>
        <img src={`${BUCKETURL}/${producto.imagenes[0]}`} alt={producto.nombre} /> {/* producto.imagen[0] */}
        <Link className="cardLink" to={`/producto/${producto.id}`}>Ver más</Link>
        <Link className="cardLink" to={`/reservas/${producto.id}`}>Reservar</Link>
        {producto && console.log(producto)}
    </div>
  )
}


export default ProductoCard