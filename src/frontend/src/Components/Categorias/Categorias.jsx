import Guitarra from "../../assets/icons/guitarra-electrica.png";
import Bajo from "../../assets/icons/bajo.png";
import Bateria from "../../assets/icons/bateria.png";
import Piano from "../../assets/icons/piano.png";
import Amplificador from "../../assets/icons/amplificador.png";
import Microfono from "../../assets/icons/microfono.png";
import styles from "./Categorias.module.css";
import { useEffect, useState } from "react";

export const Categorias = () => {

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

  // const categorias = [
  //   {
  //     id: Math.random() * 3,
  //     nombre: "Guitarras",
  //     imagen: Guitarra,
  //   },
  //   {
  //     id: Math.random() * 3,
  //     nombre: "Bajos",
  //     imagen: Bajo,
  //   },
  //   {
  //     id: Math.random() * 3,
  //     nombre: "Baterias",
  //     imagen: Bateria,
  //   },
  //   {
  //     id: Math.random() * 3,
  //     nombre: "Pianos",
  //     imagen: Piano,
  //   },
  //   {
  //     id: Math.random() * 3,
  //     nombre: "Amplificadores",
  //     imagen: Amplificador,
  //   },
  //   {
  //     id: Math.random() * 3,
  //     nombre: "Micrófonos",
  //     imagen: Microfono,
  //   },
  // ];


  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Categorias</h1>
        <div className={styles.cardContainer}>
          {categorias.map((categoria) => (
            <div className={styles.card} key={categoria.id}>
              <img src={`${bucket}/${categoria.icono}`} alt={categoria.nombre} />
              <h2>{categoria.nombre}s</h2>
            </div>
          ))}
        </div>
    </div>
  );
};
