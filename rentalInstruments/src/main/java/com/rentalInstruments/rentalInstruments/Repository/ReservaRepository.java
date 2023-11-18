package com.rentalInstruments.rentalInstruments.Repository;

import com.rentalInstruments.rentalInstruments.Repository.Entities.Instrumento;
import com.rentalInstruments.rentalInstruments.Repository.Entities.Reserva;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
@Transactional
public interface ReservaRepository extends JpaRepository<Reserva ,Long> {
    Optional<Reserva> findById(Long  id);

    Optional<Reserva> findByInstrumentoAndFechaInicioBetweenOrFechaDevolucionBetween(Instrumento instrumento, LocalDate fechaInicio, LocalDate fechaDevolucion);
}

