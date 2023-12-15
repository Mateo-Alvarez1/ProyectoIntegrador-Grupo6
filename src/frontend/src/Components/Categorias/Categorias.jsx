import styles from "./Categorias.module.css";
import { useEffect, useState } from "react";
import { ScaleLoader } from "react-spinners";

export const Categorias = ({ onSelectedCategory }) => {

  const [categorias, setCategorias] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const url = "http://3.89.202.193:8080/api/v1/categoria";
  const bucket = "https://1023c01grupo6.s3.amazonaws.com";

  useEffect(() => {
    setIsLoading(true);

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCategorias(data);
        setIsLoading(false);
      });
  }, []) 

  const handleClickCategory = (category) => {
    onSelectedCategory(category);
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Categorias</h1>
      {isLoading ? (
        <div style={{margin: "0 auto"}}>
          <ScaleLoader color="#4f6073" height={20}/>
        </div>) 
      : (
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
      )}
    </div>
  );
};
