
import RangePicker from "../../Components/DateRangePicker/RangePicker"
import ReservaProducto from "../../Components/ReservaProducto/ReservaProducto"
import DatosUsuario from "../../Components/datosUsuario/DatosUsuario"

const Reservas = () => {

  return (
    <>
    <div className="reserva-container">
      <DatosUsuario/>
      <RangePicker/>
    {/* <ReservaProducto/> */}
    </div>
    </>
    
  )
}

export default Reservas
