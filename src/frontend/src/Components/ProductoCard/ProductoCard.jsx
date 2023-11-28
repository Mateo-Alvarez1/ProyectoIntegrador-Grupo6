import { Link } from "react-router-dom";
import styles from "./ProductoCard.module.css";

const ProductoCard = ({ producto }) => {

  const BUCKETURL="https://1023c01grupo6.s3.amazonaws.com";
  
console.log(producto);
  return (
    <div className={styles.card} >
        <h3>{producto.nombre}</h3>
        <p>Precio: USD {producto.precio}</p>
        <img src={`${BUCKETURL}/${producto.imagenes[0]}`} alt={producto.nombre} /> {/* producto.imagen[0] */}
        <Link className={styles.button} to={`/producto/${producto.id}`}>
          Ver más
        </Link>
    </div>
  )
}


export default ProductoCard