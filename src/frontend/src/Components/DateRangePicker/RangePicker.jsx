import { useState } from "react";
import { DateRange } from "react-date-range";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css'
import './rangePicker.css'
import ReservaProducto from "../ReservaProducto/ReservaProducto";
import DatosUsuario from "../datosUsuario/DatosUsuario"

const RangePicker = () => {

  const [date, setDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

  const handleChange = (ranges) => {
    const { startDate, endDate } = ranges.selection;
    if (endDate - startDate < 2) {
      return false;
    }
    setDate(ranges.selection);
  };

const deshabilitarDias = (ranges) => {

  const { startDate, endDate } = ranges.selection;
  
    const hoy = startDate;
    hoy.setHours(0, 0, 0, 0);
    const dosDiasDespues = new Date();
    dosDiasDespues.setDate(hoy.getDate() + 2);
    return date < dosDiasDespues;
  };



  return (
    <div className="container">

      <div className="container1">

        <div className="datos-usuario-container">
          <DatosUsuario/>
        </div>

        <div className="range-picker-container">
          <div >
            <h2>Selecciona tu fecha de reserva</h2>
            <DateRange
            className="calendar"
            ranges={[date]}
            onChange={handleChange}
            disabledDay={deshabilitarDias}
            minDate={new Date()}
            months={2}
            direction="horizontal"
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
