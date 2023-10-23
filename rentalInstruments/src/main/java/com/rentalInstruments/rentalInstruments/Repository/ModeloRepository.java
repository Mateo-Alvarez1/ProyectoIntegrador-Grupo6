package com.rentalInstruments.rentalInstruments.Repository;

import com.rentalInstruments.rentalInstruments.Repository.Entities.Modelo;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
@Transactional
public interface ModeloRepository extends JpaRepository<Modelo, Long> {
}
