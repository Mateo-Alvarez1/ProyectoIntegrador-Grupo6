package com.rentalInstruments.rentalInstruments.service;

import com.rentalInstruments.rentalInstruments.Repository.Entities.Instrumento;
import com.rentalInstruments.rentalInstruments.Repository.InstrumentoRepository;
import com.rentalInstruments.rentalInstruments.model.InstrumentoDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
@Slf4j
public class InstrumentoService implements InstrumentoInterface {

    @Autowired
    private InstrumentoRepository instrumentoRepository;

//PRIMER VERSION COMO PARA PROBAR EL ENDPOINT Y QUE EL PRODUCTO SE GUARDE EN LA BASE DE DATOS
    @Override
    public Instrumento agregarInstrumento(InstrumentoDto instrumentoDto) {
        if (instrumentoDto.getStock() <= 0){
            throw new RuntimeException("no existe stock de este producto");
        }

        Instrumento instrumento = new Instrumento();
        instrumento.setNombre(instrumentoDto.getNombre());
        instrumento.setPrecio(instrumentoDto.getPrecio());
        instrumento.setStock(instrumentoDto.getStock());

        instrumentoRepository.save(instrumento);
        return instrumento;
    }
}
