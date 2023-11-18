package com.rentalInstruments.rentalInstruments.Repository;

import com.rentalInstruments.rentalInstruments.Repository.Entities.Modelo;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@Transactional
public interface ModeloRepository extends JpaRepository<Modelo, Long> {
    @Query("select m from Modelo m WHERE m.numeroSerie = ?1")
    Optional<Modelo> findByNumeroSerie(String numeroSerie);
}
