package com.rentalInstruments.rentalInstruments.service;

import com.rentalInstruments.rentalInstruments.Repository.Entities.Instrumento;
import com.rentalInstruments.rentalInstruments.exceptions.ObjectAlreadyExists;
import com.rentalInstruments.rentalInstruments.exceptions.ResourceNotFoundException;
import com.rentalInstruments.rentalInstruments.model.InstrumentoDto;

import java.util.List;

public interface InstrumentoInterface {
    Instrumento agregarInstrumento(InstrumentoDto instrumentoDto) throws ObjectAlreadyExists;

    Instrumento buscar(Long id) throws ResourceNotFoundException;

    List<Instrumento> buscarTodos()throws ResourceNotFoundException;

    void eliminar(Long id) throws ResourceNotFoundException;


    Instrumento modificar(Long id, Instrumento nuevoInstrumento) throws ResourceNotFoundException;

    void agregarStock(Long id) throws ResourceNotFoundException;
<<<<<<< HEAD
    Instrumento editarCategoria (Long instrumentoid , Long nuevaCategoriaId) throws ResourceNotFoundException;
=======

    Instrumento editarCategoria (InstrumentoDto instrumentoDto) throws ResourceNotFoundException;
>>>>>>> bac1b2a90cacb49f9f2724f155687fa6d5389a9e
}
