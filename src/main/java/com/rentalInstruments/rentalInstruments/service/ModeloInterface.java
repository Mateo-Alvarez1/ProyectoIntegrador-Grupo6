package com.rentalInstruments.rentalInstruments.service;

import com.rentalInstruments.rentalInstruments.Repository.Entities.Modelo;
import com.rentalInstruments.rentalInstruments.model.ModeloDto;

public interface ModeloInterface {
    Modelo agregarModelo (ModeloDto modeloDto);
}
