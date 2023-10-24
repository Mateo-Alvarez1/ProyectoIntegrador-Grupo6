package com.rentalInstruments.rentalInstruments.service;

import com.rentalInstruments.rentalInstruments.Repository.Entities.Instrumento;
import com.rentalInstruments.rentalInstruments.model.InstrumentoDto;

import java.util.Optional;

public interface InstrumentoInterface {
    Instrumento agregarInstrumento(InstrumentoDto instrumentoDto);
}
