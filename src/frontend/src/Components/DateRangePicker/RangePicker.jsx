import { useState } from "react";
import { DateRange } from "react-date-range";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css'
import './rangePicker.css'

const RangePicker = () => {

  const [date, setDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

  const handleChange = (ranges) => {
    setDate(ranges.selection)
  }

  return (
    <div className="container">
      <h2>Selecciona tu fecha de reserva</h2>
      <DateRange
      ranges={[date]}
      onChange={handleChange}
      minDate={new Date()}
      months={2}
      direction="horizontal"
      />
    </div>
  );
};

export default RangePicker;
