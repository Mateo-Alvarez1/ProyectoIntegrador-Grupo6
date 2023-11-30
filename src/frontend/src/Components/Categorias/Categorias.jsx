import styles from "./Categorias.module.css";
import { useEffect, useState } from "react";

export const Categorias = ({ onSelectedCategory }) => {

  const [categorias, setCategorias] = useState([]);
  const url = "http://localhost:8080/api/v1/categoria";
  const bucket = "https://1023c01grupo6.s3.amazonaws.com";

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCategorias(data);
      });
  }, []) 

  const handleClickCategory = (category) => {
    onSelectedCategory(category);
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Categorias</h1>
        <div className={styles.cardContainer}>
          {categorias.map((categoria) => (
            <div 
              className={styles.card} 
              key={categoria.id}
              onClick={() => handleClickCategory(categoria.nombre)}
            >
              <img src={`${bucket}/${categoria.icono}`} alt={categoria.nombre} />
              <h2>{categoria.nombre}s</h2>
            </div>
          ))}
        </div>
    </div>
  );
};
