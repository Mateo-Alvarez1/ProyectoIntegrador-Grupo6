package com.rentalInstruments.rentalInstruments.Repository;

import com.rentalInstruments.rentalInstruments.Repository.Entities.Instrumento;
import com.rentalInstruments.rentalInstruments.model.InstrumentoDto;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public interface InstrumentoRepository extends JpaRepository<Instrumento, Long> {
    @Query("select i from Instrumento i where i.nombre = ?1")
    Optional<Instrumento> findByNombre(String nombre);

    @Query("select i from Instrumento i where i.categoria.nombre = ?1")
    List<Instrumento> findByCategoria(String categoria);

}