package com.rentalInstruments.rentalInstruments.service;

import com.rentalInstruments.rentalInstruments.Repository.Entities.Instrumento;
import com.rentalInstruments.rentalInstruments.exceptions.ObjectAlreadyExists;
import com.rentalInstruments.rentalInstruments.exceptions.ResourceNotFoundException;
import com.rentalInstruments.rentalInstruments.model.InstrumentoDto;

public interface InstrumentoInterface {
    Instrumento agregarInstrumento(InstrumentoDto instrumentoDto) throws ObjectAlreadyExists;
    void agregarStock(Long id) throws ResourceNotFoundException;
    void editarCategoria (Long id , Long nuevaCategoriaId) throws ResourceNotFoundException;
}
