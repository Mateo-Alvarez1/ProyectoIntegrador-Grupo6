package com.rentalInstruments.rentalInstruments.service;

import com.rentalInstruments.rentalInstruments.Repository.Entities.Instrumento;
import com.rentalInstruments.rentalInstruments.Repository.InstrumentoRepository;
import com.rentalInstruments.rentalInstruments.exceptions.ObjectAlreadyExists;
import com.rentalInstruments.rentalInstruments.model.InstrumentoDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class InstrumentoService implements InstrumentoInterface {

    private final InstrumentoRepository instrumentoRepository;

//PRIMER VERSION COMO PARA PROBAR EL ENDPOINT Y QUE EL PRODUCTO SE GUARDE EN LA BASE DE DATOS
    @Override
    public Instrumento agregarInstrumento(InstrumentoDto instrumentoDto) throws ObjectAlreadyExists {

        if ( instrumentoRepository.findByNombre(instrumentoDto.getNombre()).isPresent()){
            log.error("Se intento ingresar un instrumento con un nombre ya persistido: " + instrumentoDto.getNombre());
            throw new ObjectAlreadyExists("El instrumento con nombre " + instrumentoDto.getNombre() + " ya se encuentra registrado");
        }



        Instrumento instrumento = new Instrumento();
        instrumento.setPrecio(instrumentoDto.getPrecio());
        instrumento.setStock(instrumentoDto.getStock());
        instrumento.setMarca(instrumentoDto.getMarca());
        instrumento.setModelo(instrumentoDto.getModelo());
        instrumento.setNombre(instrumentoDto.getMarca().getNombre());


        instrumentoRepository.save(instrumento);
        return instrumento;
    }




}
