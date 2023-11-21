import { useEffect, useState } from "react";

const ReservaProducto = () => {

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

console.log(mixedProducts);

function shuffleArray(array) {
  return array.slice().sort(() => Math.random() - 0.5);
}

useEffect(()=>{
  buscarInstrumentos()
},[])


  return (
    <div>
    {
        mixedProducts.map( prod => {(
            <div>
                <img src={prod.imagenes} alt="img" />
                <h1>{prod.nombre}</h1>
                <p>{prod.precio}</p>
            </div>
        )})
    }
  </div>
  )
}

export default ReservaProducto
