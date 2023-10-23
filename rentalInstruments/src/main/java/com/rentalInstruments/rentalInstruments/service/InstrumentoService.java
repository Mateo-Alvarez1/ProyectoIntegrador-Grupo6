package com.rentalInstruments.rentalInstruments.service;

import com.rentalInstruments.rentalInstruments.Repository.Entities.Instrumento;
import com.rentalInstruments.rentalInstruments.Repository.Entities.Marca;
import com.rentalInstruments.rentalInstruments.Repository.InstrumentoRepository;
import com.rentalInstruments.rentalInstruments.model.InstrumentoDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
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
        instrumento.setMarca(instrumentoDto.getMarca());
        instrumento.setModelo(instrumentoDto.getModelo());

        System.out.println(instrumentoDto.getModelo().getNumeroSerie());

        crearNombreLista(instrumentoDto.getNombre() , instrumentoDto.getModelo().getNumeroSerie());

        instrumentoRepository.save(instrumento);
        return instrumento;
    }

    private void crearNombreLista(String nombre , Integer numeroSerie){
        String nombreLista = nombre + "-" + numeroSerie.toString();
        System.out.println(nombreLista);
    }

}
