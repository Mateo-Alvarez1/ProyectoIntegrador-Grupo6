package com.rentalInstruments.rentalInstruments.Repository;

import com.rentalInstruments.rentalInstruments.Repository.Entities.Instrumento;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@Transactional
public interface InstrumentoRepository extends JpaRepository<Instrumento, Long> {

//    @Query("SELECT instrumento.nombre as nombre , modelo.numeroSerie as numeroSerie , concat(instrumento.nombre ,'-' , modelo.numeroSerie) as nombreLista FROM instrumento JOIN modelo ON modelo_id = instrumento.modelo_id WHERE instrumento.nombre = :nombre")
//    Optional<Instrumento> findByName(String nombre);

}
