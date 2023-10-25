import { Link, } from "react-router-dom";





const ProductoCard = ({producto}) => {


  return (
    <Link to={`/producto/${producto.id}`}>
    <div className="recomendacionesCard" >
      
        <h3>{producto.nombre}</h3>
        <p>Precio: USD {producto.precio}</p>
        <img src={producto.imagen} alt={producto.nombre} />
        <Link className="cardLink" to={`/producto/${producto.id}`}>Ver más</Link>
    </div>
    </Link>
  )
}


export default ProductoCard