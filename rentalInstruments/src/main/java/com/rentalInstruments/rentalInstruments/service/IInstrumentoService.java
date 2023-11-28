package com.rentalInstruments.rentalInstruments.service;

import com.rentalInstruments.rentalInstruments.Repository.Entities.Instrumento;
import com.rentalInstruments.rentalInstruments.exceptions.ObjectAlreadyExists;
import com.rentalInstruments.rentalInstruments.exceptions.ResourceNotFoundException;
import com.rentalInstruments.rentalInstruments.model.InstrumentoDto;

import java.util.List;

public interface IInstrumentoService {
    Instrumento agregarInstrumento(InstrumentoDto instrumentoDto) throws ObjectAlreadyExists;

    Instrumento buscar(Long id) throws ResourceNotFoundException;

    List<Instrumento> buscarTodos()throws ResourceNotFoundException;

    void eliminar(Long id) throws ResourceNotFoundException;


    Instrumento modificar(Long id, InstrumentoDto instrumentoDto) throws ResourceNotFoundException, ObjectAlreadyExists;

    void agregarStock(Long id) throws ResourceNotFoundException;

<<<<<<< HEAD:rentalInstruments/src/main/java/com/rentalInstruments/rentalInstruments/service/IInstrumentoService.java

=======
    Instrumento editarCategoria (Long id ,InstrumentoDto instrumentoDto) throws ResourceNotFoundException, ObjectAlreadyExists;
>>>>>>> d390bf04f17160395e12ba69bcefa8758094ab70:rentalInstruments/src/main/java/com/rentalInstruments/rentalInstruments/service/InstrumentoInterface.java
}
