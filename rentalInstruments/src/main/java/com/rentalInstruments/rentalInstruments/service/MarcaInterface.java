package com.rentalInstruments.rentalInstruments.service;

import com.rentalInstruments.rentalInstruments.Repository.Entities.Marca;
import com.rentalInstruments.rentalInstruments.model.MarcaDto;

public interface MarcaInterface {
        Marca agregarMarca(MarcaDto marcaDto);
}
