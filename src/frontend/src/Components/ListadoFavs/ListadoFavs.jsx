//import productos from "../../utils/products.json";
import { useState, useEffect, useContext } from 'react';
import ProductoCard from '../ProductoCard/ProductoCard';
import styles from "./listadoFavs.module.css";
import { useParams } from 'react-router';
import { userContext } from '../../context/userContext';

const ListadoFavs = () => {
  const {userEmail} = useParams();
  const [favoritos, setFavoritos]= useState([])
  const usercontextResult = useContext(userContext);
  const user = usercontextResult.user

  useEffect(() => {
    
    const obtenerFavs = async () => {
        try {
        
        const response = await fetch(`http://3.89.202.193:8080/api/v1/usuarios/${userEmail}/listar`);
        
        
        if (response.ok) {
        
            const data = await response.json();
            
        
            setFavoritos(data);
        } else {
            console.error('Error al obtener las reservas');
        }
        } catch (error) {
        console.error('Error en la solicitud:', error);
        }
    };

    
    obtenerFavs();
    }, [userEmail]);

    const actualizarFavoritos = (productoId, esFavorito) => {
      // Actualiza la lista de favoritos en función del cambio de estado de un producto
      setFavoritos(prevFavoritos => {
        if (esFavorito) {
          // Agregar el producto a la lista de favoritos
          return [...prevFavoritos, { id: productoId }];
        } else {
          // Quitar el producto de la lista de favoritos
          return prevFavoritos.filter(producto => producto.id !== productoId);
        }
      });
    };

  return (
      <div className={styles.productContainer}>
        {favoritos.length > 0 ? (
        favoritos.map((producto) => (
          <ProductoCard
            key={producto.id}
            producto={producto}
            user={user}
            onFavoritoChange={actualizarFavoritos}
          />
        ))
      ) : (
        <p>No hay favoritos seleccionados.</p>
      )}
      </div>
  )
}

export default ListadoFavs