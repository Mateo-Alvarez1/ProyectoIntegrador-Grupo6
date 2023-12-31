import { useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import { addDays } from "date-fns";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import './rangePicker.css';
import ReservaProducto from "../ReservaProducto/ReservaProducto";
import DatosUsuario from "../datosUsuario/DatosUsuario";
import { useParams } from "react-router";

const RangePicker = () => {
  const [date, setDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });
  const [reservas,setReservas]= useState([]);
  const {productoId}=useParams();
  const RESERVAURL ="http://3.89.202.193:8080/api/v1/reservas"



const obtenerReservas = async()=>{
  try{
    const response = await fetch(`${RESERVAURL}/instrumento/${productoId}`);
    const data = await response.json();

    console.log("Reservas del instrumento");
    console.log(data);

    setReservas(data);


  }
  catch(error){
    console.log("error peticion" + error);
  }
}


useEffect(()=>{
  obtenerReservas();
},[])







  const handleChange = (ranges) => {
    const { startDate, endDate } = ranges.selection;
    if (endDate - startDate < 2) {
      return false;
    }
    setDate(ranges.selection);
  };

  const disabledDates = [
    {
      start: new Date(new Date().getFullYear(), 11, 6),
      end: new Date(new Date().getFullYear(), 11, 7),
    },
  ];

  const dayContentRenderer = (date, _, dayProps) => {
    // Verifica si la fecha está en el rango de alguna reserva realizada
    const isReserved = reservas.some((reserva) => {
      const reservaStartDate = new Date(reserva.fechaInicio);
      const reservaEndDate = new Date(reserva.fechaDevolucion);
  
      // Ajuste: Suma un día a la fecha de devolución
      reservaEndDate.setDate(reservaEndDate.getDate() + 1);
  
      // Utiliza la misma lógica del rango del 25 al 27
      return date >= reservaStartDate && date <= reservaEndDate;
    });
  
    // Aplica estilos adicionales a todas las fechas (negro y negrita por defecto)
    const additionalStyles = { color: 'black', fontWeight: 'bold' };
  
    // Modifica los estilos adicionales solo si la fecha está reservada
    if (isReserved) {
      additionalStyles.color = 'red';
      additionalStyles.fontWeight = 'bold';
    }
  
    return (
      <div {...dayProps} style={dayProps?.style ? { ...dayProps.style, ...additionalStyles } : additionalStyles}>
        {date.getDate()}
      </div>
    );
  };
  
  
  
  
  
  

  return (
    <div className="container">
      <div className="container1">
        <div className="datos-usuario-container">
          <DatosUsuario/>
        </div>
        <div className="range-picker-container">
          <div>
            <h2>Selecciona tu fecha de reserva <span>(minimo 72hs)</span></h2>
            <DateRange
              className="calendar"
              ranges={[date]}
              onChange={handleChange}
              minDate={new Date()}
              months={2}
              direction="horizontal"
              disabledDates={disabledDates}
              dayContentRenderer={dayContentRenderer}
            />
          </div>
        </div>
      </div>
      <div className="container2">
        <ReservaProducto date={date}/>
      </div>
    </div>
  );
};

export default RangePicker;
