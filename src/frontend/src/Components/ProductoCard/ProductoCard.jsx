import { Link } from "react-router-dom";
import styles from "./ProductoCard.module.css";
import { useState, useEffect, useContext} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { userContext } from "../../context/userContext";


const ProductoCard = ({ producto, user}) => {

  const BUCKETURL="https://1023c01grupo6.s3.amazonaws.com";
  const [favorito, setFavorito] = useState(false);
  const [showText, setShowText] = useState(false);
  
  
  


  const addToFavorites = async ({userEmail, productoId}) => {    
    try{
    const response = await fetch(`http://localhost:8080/api/v1/usuarios/${userEmail}/instrumentos/${productoId}/favorito`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",        
      },
    });
  
    if (response.ok) {
      setFavorito(true);
    } else {
      console.error("Error al agregar a favoritos:", response.status, response.statusText);
    }
  } catch (error) {
    console.error("Error al agregar a favoritos:", error.message);
  }
};
  
  
  const removeFromFavorites = async ({userEmail, productoId}) => {    
    try {
    const response = await fetch(`http://localhost:8080/api/v1/usuarios/${userEmail}/instrumentos/${productoId}/favorito`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",        
      },
    });
  
    if (response.ok) {
      setFavorito(false);
    } else {
      console.error("Error al quitar de favoritos:", response.status, response.statusText);
    }
  } catch (error) {
    console.error("Error al quitar de favoritos:", error.message);
  }
};

  const obtenerEstadoFavorito = async () => {
    try {
      if (!user || !user.email) {
        setFavorito(false);
        return;
      }
      
      const userEmail = user.email;
      const response = await fetch(`http://localhost:8080/api/v1/usuarios/${userEmail}/listar`);
      if (response.ok) {
        const listaFavoritos = await response.json();
        
        const esFavorito = listaFavoritos.some(favorito => favorito.id === producto.id);
        
        setFavorito(esFavorito);
      } else {
        console.error("Error al obtener el estado de favoritos:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error al obtener el estado de favoritos:", error.message);
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
      obtenerEstadoFavorito();  
      
    
  }catch (error) {
      console.error("Error al manejar la acción de favoritos:", error.message);
    }
  };

  useEffect(() => {    
    
    obtenerEstadoFavorito();
  }, [producto, user]);
  
console.log(producto);

  return (
    <div className={styles.card} 
      onMouseEnter={() => setShowText(true)}
      onMouseLeave={() => setShowText(false)}>
        <h3>{producto.nombre}</h3>
        <p>Precio: USD {producto.precio}</p>
        <img src={`${BUCKETURL}/${producto.imagenes[0]}`} alt={producto.nombre} /> {/* producto.imagen[0] */}
        <Link className={styles.button} to={`/producto/${producto.id}`}>
          Ver más
        </Link>
        <div className={styles.favoriteContainer}>
        <div >
        <FontAwesomeIcon
        icon={faStar}
        className={`${styles.favoriteIcon} ${favorito ? styles.favorited : ''}`}
        onClick={handleToggleFavorite}
      />
      </div>
      </div>
      {showText && (
          <p className={styles.favoriteText}>
            {favorito
              ? 'Quitar favorito'
              : 'Añadir favorito'}
          </p>
        )}
      </div>
    
  )
}


export default ProductoCard