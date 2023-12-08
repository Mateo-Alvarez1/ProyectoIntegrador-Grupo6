package com.rentalInstruments.rentalInstruments.service;

import com.rentalInstruments.rentalInstruments.Repository.Entities.Categoria;
import com.rentalInstruments.rentalInstruments.Repository.Entities.Instrumento;
import com.rentalInstruments.rentalInstruments.exceptions.InvalidDataEntry;
import com.rentalInstruments.rentalInstruments.exceptions.ObjectAlreadyExists;
import com.rentalInstruments.rentalInstruments.exceptions.ResourceNotFoundException;
import com.rentalInstruments.rentalInstruments.model.CategoriaDto;
import com.rentalInstruments.rentalInstruments.model.InstrumentoDto;

import java.util.List;

public interface ICategoriaService {

    String eliminarCategoria(String nombre , Long id) throws InvalidDataEntry, ResourceNotFoundException;
    Instrumento editarCategoria (Long id , InstrumentoDto instrumentoDto) throws ResourceNotFoundException, ObjectAlreadyExists;
    List<Categoria> listarCategorias() throws ResourceNotFoundException;

    String crearCategoria(CategoriaDto categoriaDto) throws ObjectAlreadyExists;

}
