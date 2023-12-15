
import { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import '../Puntuación/puntuacion.css';

const Puntuacion = ( onPuntuacionSubmit ) => {
  const [puntuacion, setPuntuacion] = useState(0);

  const StarClick = (star) => {
    setPuntuacion(star);
    onPuntuacionSubmit(star);
  };

  return (
    <div className = "puntuacion">
      <p className = "titulo-puntuacion">Calificacion del producto:</p>
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          onClick={() => StarClick(star)}
          style={{ color: star <= puntuacion ? '#ffc107' : '#e4e5e9', cursor: 'pointer' }}
          size={40}
        />
      ))}
    </div>
  );
};

export default Puntuacion;
