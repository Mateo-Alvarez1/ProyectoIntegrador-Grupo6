package com.rentalInstruments.rentalInstruments.service;

import com.rentalInstruments.rentalInstruments.Repository.Entities.Instrumento;
import com.rentalInstruments.rentalInstruments.Repository.Entities.Reserva;
import com.rentalInstruments.rentalInstruments.Repository.Entities.Usuario;
import com.rentalInstruments.rentalInstruments.Repository.InstrumentoRepository;
import com.rentalInstruments.rentalInstruments.Repository.ReservaRepository;
import com.rentalInstruments.rentalInstruments.Repository.UsuarioRepository;
import com.rentalInstruments.rentalInstruments.exceptions.ReservaNoDisponibleException;
import com.rentalInstruments.rentalInstruments.exceptions.ResourceNotFoundException;
import com.rentalInstruments.rentalInstruments.exceptions.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class ReservaService {

    @Autowired
    private final ReservaRepository reservaRepository;
    @Autowired
    private final UsuarioRepository usuarioRepository;
    @Autowired
    private final InstrumentoRepository instrumentoRepository;

    public Reserva generarReserva(Reserva reserva) throws ReservaNoDisponibleException, ResourceNotFoundException {
        Usuario usuario = usuarioRepository.findById(reserva.getId())
                .orElseThrow(() -> new UserNotFoundException("Usuario no encontrado"));

        Instrumento instrumento = instrumentoRepository.findById(reserva.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Instrumento no encontrado"));

        // Verificar disponibilidad
        boolean disponible = verificarDisponibilidad(instrumento, reserva.getFechaInicio(), reserva.getFechaDevolucion());
        if (!disponible) {
            throw new ReservaNoDisponibleException("El instrumento no está disponible para las fechas seleccionadas");
        }

        reserva.setDisponibilidad(true);
        reserva.setUsuario(usuario);
        reserva.setInstrumento(instrumento);

        return reservaRepository.save(reserva);


    }
    private boolean verificarDisponibilidad(Instrumento instrumento, LocalDate fechaInicio, LocalDate fechaDevolucion) {
        Optional<Reserva> reservas = reservaRepository.buscarResevaPorInstrumentoYFecha(
                instrumento,
                fechaInicio,
                fechaDevolucion

        );

        return reservas.isEmpty();
    }


}
