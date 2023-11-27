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

 /* const deshabilitarDias = (date) => {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0); // Establecer las horas a 00:00:00 para comparar solo las fechas

    const dosDiasDespues = new Date();
    dosDiasDespues.setDate(hoy.getDate() + 2);

    // Deshabilitar si la fecha es menos de 2 días a partir de hoy
    return date < dosDiasDespues;
  };*/


  // const isWithinDisabledRange = (date) => {
  //   // Define the range you want to disable (e.g., November 25th, 2023, to November 30th, 2023)
  //   const disabledStartDate = new Date('2023-11-25');
  //   const disabledEndDate = new Date('2023-11-30');
  //   return date >= disabledStartDate && date <= disabledEndDate;
  // };

  // const disabledDateFunc = (date) => isWithinDisabledRange(date);


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
            /*disabledDay={deshabilitarDias}*/
            minDate={new Date()}
            months={2}
            direction="horizontal"
            // disabledDates={disabledDateFunc}
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
