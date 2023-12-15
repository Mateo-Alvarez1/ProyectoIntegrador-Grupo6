import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import "./ReservaConfirmacion.css";
import { Link } from 'react-router-dom';

const ReservaConfirmacion = () => {
  const { reservaID } = useParams();
  const [reserva, setReserva] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const RESERVAURL = `http://3.89.202.193:8080/api/v1/reservas/${reservaID}`;

  const BUCKETURL="https://1023c01grupo6.s3.amazonaws.com";

  const reservaData = async () => {
    try {
      const response = await fetch(RESERVAURL);
      const jsonData = await response.json();

      setReserva(jsonData);
      setLoading(false); // Marcar la carga como completa
    } catch (error) {
      console.error("Error al obtener datos:", error);
      setError(error); // Registrar el error si ocurre
      setLoading(false); // Marcar la carga como completa incluso si hay un error
    }
  };

  useEffect(() => {
    reservaData();
    console.log("Cargando por primera vez");
  }, []); // La dependencia está vacía para que se ejecute solo una vez al montar el componente

  return (
    <section>
      {loading && <p>Cargando...</p>}
      {error && <p>Error al cargar la reserva: {error.message}</p>}
      {!loading && !error && (
        <div className='divcontainer-confirmacion'>
        <div className='div-confirmacion'>
          <h1 className='titulo-confirmacion'>¡Reserva realizada con éxito!</h1>
          <p className='texto-confirmacion'>Instrumento: {reserva.usuario && reserva.instrumento.nombre}</p>
          <p className='texto-confirmacion'>Fecha Inicio: {reserva.usuario && reserva.fechaInicio.split("-").reverse().join("/")}</p>
          <p className='texto-confirmacion'>Fecha Devolución: {reserva.usuario && reserva.fechaDevolucion.split("-").reverse().join("/")}</p>
          </div>
          <div className='divimg-confirmacion'>
          <img src={`${BUCKETURL}/${reserva.instrumento.imagenes[0]}`} alt="confirmacion" className='img-confirmacion' />
          <Link to="/">
          <a className='button-confirmacion'>Volver al inicio</a>
          </Link>
          </div>
         
        </div>
      )}
    </section>
  );
};

export default ReservaConfirmacion;
