import "./recomendaciones.css";
import productos from "../../utils/products.json";
import { useState, useEffect } from "react";
import ProductoCard from "../ProductoCard/ProductoCard";


const Recomendaciones = () => {

const [mixedProducts, setMixedProducts] = useState([]);

const URLINSTRUMENTOS= "http://localhost:8080/api/v1/instrumentos";

const buscarInstrumentos= ()=>{

  fetch(URLINSTRUMENTOS).
  then(response=>response.json()).
  then(data=>{
    data=shuffleArray(data);
    setMixedProducts(data)

    
  })

}


function shuffleArray(array) {
  return array.slice().sort(() => Math.random() - 0.5);
}

useEffect(()=>{
  buscarInstrumentos()
},[])


 

 

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
