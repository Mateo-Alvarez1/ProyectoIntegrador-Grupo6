import { useState } from "react";
import { DateRange } from "react-date-range";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css'
import './rangePicker.css'
import ReservaProducto from "../ReservaProducto/ReservaProducto";

const RangePicker = () => {

  const [date, setDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

  const handleChange = (ranges) => {
    setDate(ranges.selection)
  }

  // const isWithinDisabledRange = (date) => {
  //   // Define the range you want to disable (e.g., November 25th, 2023, to November 30th, 2023)
  //   const disabledStartDate = new Date('2023-11-25');
  //   const disabledEndDate = new Date('2023-11-30');
  //   return date >= disabledStartDate && date <= disabledEndDate;
  // };

  // const disabledDateFunc = (date) => isWithinDisabledRange(date);


  return (
    <div className="container">
      <div>
      <h2>Selecciona tu fecha de reserva</h2>
      <DateRange
      ranges={[date]}
      onChange={handleChange}
      minDate={new Date()}
      months={2}
      direction="horizontal"
      // disabledDates={disabledDateFunc}
      />
      </div>
      <ReservaProducto date={date}/>
    </div>
  );
};

export default RangePicker;
