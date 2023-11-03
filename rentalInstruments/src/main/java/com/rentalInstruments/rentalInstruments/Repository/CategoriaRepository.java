package com.rentalInstruments.rentalInstruments.Repository;

import com.rentalInstruments.rentalInstruments.Repository.Entities.Categoria;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@Transactional
public interface CategoriaRepository extends JpaRepository<Categoria , Long> {
    Optional<Categoria> findById(Long id);
    Optional<Categoria> findByName(String nombre);
}
