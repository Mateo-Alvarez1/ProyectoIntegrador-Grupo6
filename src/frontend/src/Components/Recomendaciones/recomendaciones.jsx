import "./recomendaciones.css";
// import productos from "../../utils/products.json";
import { useState, useEffect, useContext } from "react";
import ProductoCard from "../ProductoCard/ProductoCard";
import { ScaleLoader } from "react-spinners";
import userContext from "../../context/userContext";



const Recomendaciones = ({ selectedCategory, resetCategory, reservas, startDate, endDate, user }) => {

const [mixedProducts, setMixedProducts] = useState([]);
const [productosDisponibles, setProductosDisponibles] = useState([]);
const [isLoading, setIsLoading] = useState(true);

//const user = useContext(userContext)
//console.log(user.email);


const url = "http://localhost:8080/api/v1/instrumentos";

useEffect(() => {
  const fetchInstrumentos = async () => {
    setIsLoading(true);
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
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchInstrumentos();
}, [selectedCategory]);

useEffect(() => {
  const productosConReservas = mixedProducts.filter((producto) => {
    const reservasArray = Array.isArray(reservas) ? reservas : [];
    const estaReservado = reservasArray.some((reserva) => {
      const reservaInicio = new Date(reserva.fechaInicio);
      const reservaFin = new Date(reserva.fechaDevolucion);

      const reservaOverlap = (
        startDate <= reservaFin && endDate >= reservaInicio
      );
    
      return reserva.instrumento.id === producto.id && reservaOverlap;
    });
    
    return !estaReservado;
  });

  setProductosDisponibles(productosConReservas);
}, [mixedProducts, reservas, startDate, endDate]);


function shuffleArray(array) {
  return array.slice().sort(() => Math.random() - 0.5);
}

const showAll = () => {
  resetCategory(); 
};

  return (
    <div id="recomendacionesContainer">
      {isLoading ? (
        <div style={{margin: "0 auto"}}>
          <ScaleLoader color="#4f6073" height={20}/>
        </div>) 
        : (
        <>
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
            {/* {mixedProducts.map((producto) => {
              return <ProductoCard producto={producto} key={producto.id}/>;
            })} */}
            {productosDisponibles.map((producto) => {
              return <ProductoCard producto={producto} key={producto.id} user={user}/>;
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Recomendaciones;
