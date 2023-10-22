package com.rentalInstruments.repository;

import com.rentalInstruments.entities.Instrumento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;


@Repository
public interface InstrumentoRepository extends JpaRepository<Instrumento,Long> {
    Optional<Instrumento> findByName(String nombre);
}
