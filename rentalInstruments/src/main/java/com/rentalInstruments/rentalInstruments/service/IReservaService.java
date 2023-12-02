package com.rentalInstruments.rentalInstruments.service;

import com.rentalInstruments.rentalInstruments.Repository.Entities.Instrumento;
import com.rentalInstruments.rentalInstruments.Repository.Entities.Reserva;
import com.rentalInstruments.rentalInstruments.exceptions.ResourceNotFoundException;
import com.rentalInstruments.rentalInstruments.model.ReservaDto;

import java.util.List;

public interface IReservaService {

    List<Reserva> buscarPorInstrumento(Long id) throws ResourceNotFoundException;

    List<Reserva> buscarPorUsuario(String email) throws ResourceNotFoundException;

    Reserva buscar(Long id) throws ResourceNotFoundException;

    List<Reserva> buscarTodos()throws ResourceNotFoundException;

    void eliminar(Long id) throws ResourceNotFoundException;
    Reserva agregarReserva(ReservaDto reservaDto) throws ResourceNotFoundException;
}
