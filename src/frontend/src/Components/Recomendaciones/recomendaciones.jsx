import "./recomendaciones.css";
import productos from "../../utils/products.json";
import { useState } from "react";
import ProductoCard from "../ProductoCard/ProductoCard";

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
          return <ProductoCard producto={producto} key={producto.id}/>;
        })}
      </div>
    </div>
  );
};

export default Recomendaciones;
