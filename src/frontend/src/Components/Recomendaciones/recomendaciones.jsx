import "./recomendaciones.css";
// import productos from "../../utils/products.json";
import { useState, useEffect } from "react";
import ProductoCard from "../ProductoCard/ProductoCard";


const Recomendaciones = ({ selectedCategory, resetCategory }) => {

const [mixedProducts, setMixedProducts] = useState([]);
const url = "http://localhost:8080/api/v1/instrumentos";

useEffect(() => {
  const fetchInstrumentos = async () => {
    try {

      const response = await fetch(url);
      const data = await response.json();

      let filteredProducts = data;

      if (selectedCategory) {
        filteredProducts = data.filter(
          (producto) => producto.categoria.nombre === selectedCategory
        );
      }

      filteredProducts = shuffleArray(filteredProducts);
      setMixedProducts(filteredProducts);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchInstrumentos();
}, [selectedCategory]);


function shuffleArray(array) {
  return array.slice().sort(() => Math.random() - 0.5);
}

const showAll = () => {
  resetCategory(); 
};

  return (
    <div id="recomendacionesContainer">
      
      {selectedCategory ? (
        <div className="categories-title">
          <h1>Instrumentos con categoría {selectedCategory}</h1>
          <button className="categories-button" onClick={showAll}>Mostrar Todos</button>
        </div>
      ) : (
        <>
          <h1>Recomendaciones</h1>
          <p>¿Listos para hacer música?</p>
        </>
      )}
      <div className="recomendacionesCardContainer">
        {mixedProducts.map((producto) => {
          return <ProductoCard producto={producto} key={producto.id}/>;
        })}
      </div>
    </div>
  );
};

export default Recomendaciones;
