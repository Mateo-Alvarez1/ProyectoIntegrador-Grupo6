package com.rentalInstruments.rentalInstruments.service;

import com.rentalInstruments.rentalInstruments.Repository.Entities.Instrumento;
import com.rentalInstruments.rentalInstruments.exceptions.BadRequestException;
import com.rentalInstruments.rentalInstruments.exceptions.ObjectAlreadyExists;
import com.rentalInstruments.rentalInstruments.exceptions.ResourceNotFoundException;
import com.rentalInstruments.rentalInstruments.model.InstrumentoDto;

import java.util.List;

public interface InstrumentoInterface {
    Instrumento agregarInstrumento(InstrumentoDto instrumentoDto) throws ObjectAlreadyExists;

    Instrumento buscar(Long id) throws ResourceNotFoundException;

    List<Instrumento> buscarTodos()throws ResourceNotFoundException;

    void eliminar(Long id) throws ResourceNotFoundException;


    Instrumento modificar(Long id, InstrumentoDto instrumentoDto) throws ResourceNotFoundException, ObjectAlreadyExists, BadRequestException;

    void agregarStock(Long id) throws ResourceNotFoundException;

    Instrumento editarCategoria (Long id ,InstrumentoDto instrumentoDto) throws ResourceNotFoundException;
}
