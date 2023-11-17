package com.rentalInstruments.rentalInstruments.service;

import com.rentalInstruments.rentalInstruments.Repository.Entities.Categoria;
import com.rentalInstruments.rentalInstruments.Repository.Entities.Instrumento;
import com.rentalInstruments.rentalInstruments.exceptions.InvalidDataEntry;
import com.rentalInstruments.rentalInstruments.exceptions.ObjectAlreadyExists;
import com.rentalInstruments.rentalInstruments.exceptions.ResourceNotFoundException;
import com.rentalInstruments.rentalInstruments.model.InstrumentoDto;

public interface ICategoriaService {

    String eliminarCategoria(String nombre) throws InvalidDataEntry;
    Instrumento editarCategoria (Long id , InstrumentoDto instrumentoDto) throws ResourceNotFoundException, ObjectAlreadyExists;

}
