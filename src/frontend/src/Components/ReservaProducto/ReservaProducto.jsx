
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import './reservaProducto.css'

const ReservaProducto = ({date}) => {

  const [data, setData] = useState([])
  const { productoId } = useParams()

  const BUCKETURL ="https://1023c01grupo6.s3.amazonaws.com"

  const productData = async() => {
    const response = await fetch(`http://localhost:8080/api/v1/instrumentos/${productoId}`)
    const data = await response.json();
    setData(data)
  }

  
  useEffect(() => {
    productData()
    
  }, [])

  const { precio } = data
  const formattedPrice = `${precio.toFixed(2)}`.replace(".", ",").replace(",00", ".00");

  return (
    <div className="cardReserva"> 
      <h2 className="title">Detalle de la reserva</h2>
       <img src={`${BUCKETURL}/${data.imagenes[0]}`} alt={data.imagenes[0]} /> 
       <div>
       <p>{data.categoria.nombre}</p>  
      <h2>{data.nombre}</h2>
       </div>

       <div className="price">
        <p>Total a pagar</p>
        <p>{formattedPrice}</p> 
       </div>
    
    <div className="checks">
      <span>Check-in</span>
      <p>{date.startDate.toLocaleDateString()}</p>
    </div>
    <div className="checks" >
      <span>Check-in</span>
      <p>{date.endDate.toLocaleDateString()}</p>
    </div>
    <div className="reservaButton">
      <button>Confirmar Reserva</button>
    </div>
    </div>
  )
}

export default ReservaProducto
