package com.rentalInstruments.rentalInstruments.service;

import com.amazonaws.services.connect.model.UserNotFoundException;
import com.rentalInstruments.rentalInstruments.Repository.Entities.Instrumento;
import com.rentalInstruments.rentalInstruments.Repository.Entities.Reserva;
import com.rentalInstruments.rentalInstruments.Repository.Entities.Usuario;
import com.rentalInstruments.rentalInstruments.Repository.InstrumentoRepository;
import com.rentalInstruments.rentalInstruments.Repository.ReservasRepository;
import com.rentalInstruments.rentalInstruments.Repository.UsuarioRepository;
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
    private ReservasRepository reservasRepository;

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
    public Reserva agregarReserva(ReservaDto reservaDto) throws ResourceNotFoundException, UserNotFoundException {
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

        Instrumento instrumento= instrumentoOptional.get();

        Reserva reserva= new Reserva();
        reserva.setUsuario(usuario);
        reserva.setInstrumento(instrumento);
        reserva.setFechaInicio(reservaDto.getFechaInicio());
        reserva.setFechaDevolucion(reservaDto.getFechaDevolucion());

        reservasRepository.save(reserva);

        /*instrumento.agregarReserva(reserva);


        instrumentoRepository.save(instrumento);*/





        return reserva;



    }
}
