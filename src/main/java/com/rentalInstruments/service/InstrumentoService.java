package com.rentalInstruments.service;

import com.rentalInstruments.entities.Instrumento;
import com.rentalInstruments.exception.BadRequestException;
import com.rentalInstruments.repository.InstrumentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.rentalInstruments.exception.BadRequestException;
import java.util.Optional;

@Service
public class InstrumentoService {

    @Autowired
    private InstrumentoRepository instrumentoRepository;

    public Instrumento agregarInstrumento(Instrumento instrumento) throws BadRequestException{
        Optional<Instrumento> instrumentoExistente = instrumentoRepository.findByName(nombre);

        if (instrumentoExistente.isPresent()) {
            throw new BadRequestException("Ya existe un instrumento con el nombre requerido");
        }
        return instrumentoRepository.save(instrumento);
    }


}









