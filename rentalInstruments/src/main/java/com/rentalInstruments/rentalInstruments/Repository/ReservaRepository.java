package com.rentalInstruments.rentalInstruments.Repository;

import com.rentalInstruments.rentalInstruments.Repository.Entities.Instrumento;
import com.rentalInstruments.rentalInstruments.Repository.Entities.Reserva;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
@Transactional
public interface ReservaRepository extends JpaRepository<Reserva ,Long> {
    Optional<Reserva> findById(Long  id);
    @Query("SELECT r FROM Reserva r WHERE r.instrumento = :instrumento AND " +
            "((r.fechaInicio BETWEEN :fechaInicio AND :fechaDevolucion) OR " +
            "(r.fechaDevolucion BETWEEN :fechaInicio AND :fechaDevolucion))")
    Optional<Reserva> buscarResevaPorInstrumentoYFecha(Instrumento instrumento, LocalDate fechaInicio, LocalDate fechaDevolucion);
}

