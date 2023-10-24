import "./recomendaciones.css";
import productos from "../../utils/products.json";
import { useState } from "react";

const Recomendaciones = () => {
  const [mixedProducts, setMixedProducts] = useState(shuffleArray(productos));

  function shuffleArray(array) {
    return array.slice().sort(() => Math.random() - 0.5);
  }

  return (
    <div id="recomendacionesContainer">
      <h1>Recomendaciones</h1>
      <p>¿Listos para hacer música?</p>
      <div className="recomendacionesCardContainer">
        {mixedProducts.map((producto) => {
          return <div className="recomendacionesCard" key={producto.id}>
            <h3>{producto.nombre}</h3>
            <p>Precio: USD {producto.precio}</p>
            <img src={producto.imagen} alt={producto.nombre} />
          </div>;
        })}
      </div>
    </div>
  );
};

export default Recomendaciones;
