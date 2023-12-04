import React from 'react'
import { useState } from "react"
import styles from './BuscadorFechas.module.css'
import { LuCalendarSearch } from "react-icons/lu";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BuscadorFechas = ({ onReservasSearch }) => {

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);

    const url = 'http://localhost:8080/api/v1/reservas'
    
    const fetchData = async () => {
        try {
          const response = await fetch(url);
          if (response.ok) {
            const data = await response.json();
            return data;
          } else {
            console.error('Error al obtener los datos de la API');
          }
        } catch (error) {
          console.error(error);
        }
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await fetchData();
        onReservasSearch(data, startDate, endDate);
      };


    return (
    <div className={styles.container}>
        <form onSubmit={handleSubmit}>
            <div className={styles.datepickerContainer}>
                <DatePicker 
                    className={styles.datepicker}
                    minDate={new Date()}
                    selected={startDate}
                    startDate={startDate}
                    endDate={endDate}
                    popperPlacement="top-start"
                    selectsRange
                    onChange={(dates) => {
                        const [start, end] = dates;
                        setStartDate(start);
                        setEndDate(end);
                    }}
                />
            </div>
            <button className={styles.button} type="submit"><LuCalendarSearch/></button>
        </form>
    </div>
  )
}

export default BuscadorFechas