package com.rentalInstruments.rentalInstruments.service;

import com.amazonaws.services.connect.model.UserNotFoundException;
import com.rentalInstruments.rentalInstruments.Repository.Entities.Instrumento;
import com.rentalInstruments.rentalInstruments.Repository.Entities.Reserva;
import com.rentalInstruments.rentalInstruments.Repository.Entities.Usuario;
import com.rentalInstruments.rentalInstruments.Repository.InstrumentoRepository;
import com.rentalInstruments.rentalInstruments.Repository.ReservaRepository;
import com.rentalInstruments.rentalInstruments.Repository.UsuarioRepository;
import com.rentalInstruments.rentalInstruments.exceptions.NotAvailableDateException;
import com.rentalInstruments.rentalInstruments.exceptions.ResourceNotFoundException;
import com.rentalInstruments.rentalInstruments.model.ReservaDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j

public class ReservaService implements IReservaService{

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private InstrumentoRepository instrumentoRepository;

    @Autowired
    private InstrumentoService instrumentoService;

    @Autowired
    private ReservaRepository reservasRepository;

    private ReservaService reservaService;

    @Override
    public List<Reserva> buscarPorInstrumento(Long id) throws ResourceNotFoundException {
        Optional<Instrumento> instrumentoOptional= instrumentoRepository.findById(id);
        if (instrumentoOptional.isEmpty()){
            log.error("No existe el instrumento");
            throw new ResourceNotFoundException("No existe el instrumento");
        }
        Instrumento instrumento= instrumentoOptional.get();
        List<Reserva> reservas= instrumento.getReservas();
        return reservas;
    }

    @Override
    public List<Reserva> buscarPorUsuario(String email) throws ResourceNotFoundException {
        Optional<Usuario> usuarioOptional= usuarioRepository.findByEmail(email);
        if (usuarioOptional.isEmpty()){
            log.error("No existe el usuario");
            throw new ResourceNotFoundException("No existe el usuario");
        }
        Usuario usuario= usuarioOptional.get();
        List<Reserva> reservas= usuario.getReservas();
        return reservas;
    }

    @Override
    public Reserva buscar(Long id) throws ResourceNotFoundException {
        Optional<Reserva> reservaOptional=reservasRepository.findById(id);
        if (reservaOptional.isEmpty()){
            log.error("No existe la reserva");
            throw new ResourceNotFoundException("No existe la reserva");
        }

        Reserva reserva= reservaOptional.get();
        return reserva;

    }

    @Override
    public List<Reserva> buscarTodos() throws ResourceNotFoundException {
        List<Reserva> reservaOptional=reservasRepository.findAll();
        if (reservaOptional.isEmpty()){
            log.error("No existen reservas");
            throw new ResourceNotFoundException("No existe la reserva");
        }

        return reservaOptional;


    }

    @Override
    public void eliminar(Long id) throws ResourceNotFoundException {
        Optional<Reserva> reservaOptional=reservasRepository.findById(id);
        if (reservaOptional.isEmpty()){
            log.error("No existe la reserva");
            throw new ResourceNotFoundException("No existe la reserva");
        }
        reservasRepository.deleteById(id);

    }

    @Override
    public Reserva agregarReserva(ReservaDto reservaDto) throws ResourceNotFoundException, UserNotFoundException, NotAvailableDateException {
        Optional<Usuario> usuarioOptional= usuarioRepository.findByEmail(reservaDto.getUsuario().getEmail());
        if (usuarioOptional.isEmpty()) {
            log.error("No existe el usuario de la reserva");
            throw new UserNotFoundException("No existe el usuario");
        }
        Usuario usuario= usuarioOptional.get();


        Optional<Instrumento> instrumentoOptional= instrumentoRepository.findById(reservaDto.getInstrumento().getId());

        if (instrumentoOptional.isEmpty()) {
            log.error("No existe el instrumento de la reserva");
            throw new ResourceNotFoundException("No existe el instrumento");

        }

        List<Reserva> reservaList = instrumentoOptional.get().getReservas();

        if (!reservaList.isEmpty()) {
            for (Reserva reserva : reservaList) {
                // Verificar si hay solapamiento de fechas
                if (reserva.getFechaInicio().isEqual(reservaDto.getFechaInicio())
                        || reserva.getFechaInicio().isEqual(reservaDto.getFechaDevolucion())
                        || reserva.getFechaDevolucion().isEqual(reservaDto.getFechaInicio())
                        || reserva.getFechaDevolucion().isEqual(reservaDto.getFechaDevolucion())
                        || (reserva.getFechaInicio().isBefore(reservaDto.getFechaDevolucion()) &&
                        reserva.getFechaDevolucion().isAfter(reservaDto.getFechaInicio()))) {
                    log.error("La fecha para la reserva no se encuentra disponible");
                    throw new NotAvailableDateException("La fecha para la reserva no se encuentra disponible");
                }
            }
        }






        Instrumento instrumento= instrumentoOptional.get();

        Reserva reserva= new Reserva();
        reserva.setUsuario(usuario);
        reserva.setInstrumento(instrumento);
        reserva.setFechaInicio(reservaDto.getFechaInicio());
        reserva.setFechaDevolucion(reservaDto.getFechaDevolucion());

        reservasRepository.save(reserva);

        log.info("Reserva agregada con exito");
        return reserva;

    }
}
