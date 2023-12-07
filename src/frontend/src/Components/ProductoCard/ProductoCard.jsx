import { Link } from "react-router-dom";
import styles from "./ProductoCard.module.css";
import { useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";


const ProductoCard = ({ producto, user}) => {

  const BUCKETURL="https://1023c01grupo6.s3.amazonaws.com";
  const [favorito, setFavorito] = useState(false);
  


  const addToFavorites = async ({userEmail, productoId}) => {    
    
    const response = await fetch(`http://localhost:8080/api/v1/usuarios/${userEmail}/instrumentos/${productoId}/favorito`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",        
      },
    });
  
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      console.error("Error al agregar a favoritos:", response.status, response.statusText);
      throw new Error("Error al agregar a favoritos");
    }
  };
  
  
  const removeFromFavorites = async ({userEmail, productoId}) => {    
    
    const response = await fetch(`http://localhost:8080/api/v1/usuarios/${userEmail}/instrumentos/${productoId}/favorito`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",        
      },
    });
  
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      console.error("Error al quitar de favoritos:", response.status, response.statusText);
      throw new Error("Error al quitar de favoritos");
    }
  };
  

  const handleToggleFavorite = async () => {
    try {
      console.log( user.email, producto.id);
              
      if (!favorito) {
        await addToFavorites( { userEmail: user.email, productoId: producto.id } );
        
      } else {
        await removeFromFavorites( { userEmail: user.email, productoId: producto.id });
      }      
      setFavorito(!favorito);  
      
    
  }catch (error) {
      console.error("Error al manejar la acción de favoritos:", error.message);
    }
  };
  
console.log(producto);
  return (
    <div className={styles.card} >
        <h3>{producto.nombre}</h3>
        <p>Precio: USD {producto.precio}</p>
        <img src={`${BUCKETURL}/${producto.imagenes[0]}`} alt={producto.nombre} /> {/* producto.imagen[0] */}
        <Link className={styles.button} to={`/producto/${producto.id}`}>
          Ver más
        </Link>
        <div className={styles.favoriteContainer}>
        <FontAwesomeIcon
        icon={faStar}
        className={`${styles.favoriteIcon} ${favorito ? styles.favorited : ''}`}
        onClick={handleToggleFavorite}
      />
      </div>
    </div>
  )
}


export default ProductoCard