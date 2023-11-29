package com.rentalInstruments.rentalInstruments.Repository;

import com.rentalInstruments.rentalInstruments.Repository.Entities.Marca;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@Transactional
public interface MarcaRepository extends JpaRepository<Marca , Long> {
    @Query("SELECT m FROM Marca m WHERE m.nombre = ?1")
    Optional<Marca> findByNombre(String nombre);
}
