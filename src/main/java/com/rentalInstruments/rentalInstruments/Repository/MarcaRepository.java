package com.rentalInstruments.rentalInstruments.Repository;

import com.rentalInstruments.rentalInstruments.Repository.Entities.Marca;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
@Transactional
public interface MarcaRepository extends JpaRepository<Marca , Long> {
}
