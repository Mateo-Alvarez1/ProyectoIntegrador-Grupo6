package com.rentalInstruments.rentalInstruments.service;

import com.rentalInstruments.rentalInstruments.Repository.Entities.Categoria;
import com.rentalInstruments.rentalInstruments.model.CategoriaDto;

public interface CategoriaInterface {
    Categoria agregarCategoria(CategoriaDto categoriaDto);
}
