package com.rentalInstruments.rentalInstruments.Repository;

import com.rentalInstruments.rentalInstruments.Repository.Entities.Reserva;
import com.rentalInstruments.rentalInstruments.Repository.Entities.Usuario;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@Transactional
public interface ReservaRepository extends JpaRepository<Reserva ,Long> {

    @Query("SELECT r FROM Reserva r WHERE r.usuario.email = ?1")
    Optional<Usuario> findByEmail(String email);
}
