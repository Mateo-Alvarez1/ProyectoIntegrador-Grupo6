import productos from "../../utils/products.json";
import ProductoCard from '../ProductoCard/ProductoCard';
import styles from "./ProductoList.module.css";

const CatalogoProd = () => {

  return (
      <div className={styles.productContainer}>
        {productos.map((producto) => {
          return <ProductoCard producto={producto} key={producto.id}/>;
        })}
      </div>
  )
}

export default CatalogoProd