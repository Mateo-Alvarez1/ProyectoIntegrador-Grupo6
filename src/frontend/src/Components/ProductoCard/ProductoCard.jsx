import { Link, } from "react-router-dom";

const ProductoCard = ({producto}) => {


  return (
    <div className="recomendacionesCard" >
        <h3>{producto.nombre}</h3>
        <p>Precio: USD {producto.precio}</p>
        <img src={producto.imagenes[0]} alt={producto.nombre} />
        <Link className="cardLink" to={`/producto/${producto.id}`}>Ver más</Link>
        {producto && console.log(producto)}
    </div>
  )
}


export default ProductoCard