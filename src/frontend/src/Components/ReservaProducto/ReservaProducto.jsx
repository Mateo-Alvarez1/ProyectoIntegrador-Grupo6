
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import './reservaProducto.css'
import { userContext } from "../../context/userContext";
import ReservaModal from "../Modal/ReservaModal";
import { differenceInDays } from 'date-fns';



const ReservaProducto = ({date}) => {

  const navigate = useNavigate();
  const [data, setData] = useState([])
  const { productoId } = useParams()
  const {user}= useContext(userContext);
  const [reserva,setReserva]= useState({
      fechaInicio:"",
      fechaDevolucion:"",
      usuario:{
        nombre:user.nombre,
        apellido:user.apellido,
        email:user.email
      },
      instrumento:{
       
      }
  
    
  })

  const [modalOpen, setModalOpen] = useState(false);
  const [error,setError] = useState("");

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };



  const BUCKETURL ="https://1023c01grupo6.s3.amazonaws.com"

  const RESERVAURL ="http://3.89.202.193:8080/api/v1/reservas"




  function formatearFecha(fechaString) {
    const [dia, mes, año] = fechaString.split('/');
    const fecha = new Date(`${año}/${mes}/${dia}`);
  
    const diaFormateado = fecha.getDate().toString().padStart(2, '0');
    const mesFormateado = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const añoFormateado = fecha.getFullYear();
  
    return `${añoFormateado}-${mesFormateado}-${diaFormateado}`;
  }

  const productData = async () => {
    try {
      const response = await fetch(`http://3.89.202.193:8080/api/v1/instrumentos/${productoId}`);
      const jsonData = await response.json();



      setData(jsonData);
      console.log("data", data);
      console.log(jsonData);
  
      setReserva({
        fechaInicio: "",
        fechaDevolucion: "",
        usuario: {
          nombre: user.nombre,
          apellido: user.apellido,
          email: user.email
        },
        instrumento: jsonData // Configurar con los datos recuperados
      });


  
    } catch (error) {
      console.error("Error al obtener datos:", error);
      console.log(reserva);
    }
  };
  








  const realizarReserva = async () => {

    await setReserva({
      fechaInicio: formatearFecha(date.startDate?.toLocaleDateString()),
      fechaDevolucion: formatearFecha(date.endDate?.toLocaleDateString()),
      usuario: {
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email
      },
      instrumento: reserva.instrumento // Configurar con los datos recuperados
    });

    // Verificar si la diferencia de días es menor a 2
  const diasDiferencia = differenceInDays(date.endDate, date.startDate);
  if (diasDiferencia < 2) {
    // Si la diferencia de días es menor a 2, establecer el error y mostrar el modal
    await setError("LA RESERVA DEBE SER DE AL MENOS 72HS");
    handleOpenModal();
    return; // Salir de la función si hay un error
  }

    try {
      const respuesta = await fetch(RESERVAURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reserva),
      });
    
      const info = await respuesta.json();
      
      console.log(info);
      navigate(`/reservas/confirmadas/${info.id}`)
    } catch (error) {
      console.error("Error al realizar reserva:", error);
      // await setError("FECHA DE RESERVA NO DISPONIBLE");
      // handleOpenModal();

    }
  };
  
 



  
  useEffect(() => {
    productData();


  }, [productoId])


  

 /* useEffect(()=>{
    console.log("reserva actualizada");
    console.log(reserva);
  },[reserva])*/

  // const { precio } = data
  const formattedPrice = data.precio ? `${data.precio.toFixed(2)}`.replace(".", ",").replace(",00", ".00") : "";

  return (
    <div className="cardReserva"> 
      <h2 className="title">Detalle de la reserva</h2>
        {data.imagenes && data.imagenes.length > 0 && (
          <img src={`${BUCKETURL}/${data.imagenes[0]}`} alt={data.imagenes[0]} />
        )} 
      <div>
       <p>{data.categoria?.nombre}</p>  
      <h2 className="titleName">{data.nombre}</h2>
       </div>

      <div className="price">
        <p>Total a pagar</p>
        <p>{formattedPrice}</p> 
      </div>
    
    <div className="checks">
      <span>Check-in</span>
      <p>{date.startDate?.toLocaleDateString()}</p>
    </div>
    <div className="checks" >
      <span>Check-out</span>
      <p>{date.endDate?.toLocaleDateString()}</p>
    </div>
    <div className="reservaButton">
      <button onClick={realizarReserva}>Confirmar Reserva</button>
    </div>

      {/* Agrega el modal */}
      <ReservaModal
        open={modalOpen}
        closeModal={handleCloseModal}
        error={error}
        /* otras propiedades necesarias */
      />
    </div>
  )
}

export default ReservaProducto
