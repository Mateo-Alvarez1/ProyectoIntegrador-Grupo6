package com.rentalInstruments.rentalInstruments.service;

import com.rentalInstruments.rentalInstruments.Repository.Entities.Marca;
import com.rentalInstruments.rentalInstruments.Repository.MarcaRepository;
import com.rentalInstruments.rentalInstruments.model.MarcaDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MarcaService implements MarcaInterface {

    @Autowired
    private MarcaRepository marcaRepository;


    @Override
    public Marca agregarMarca(MarcaDto marcaDto) {
        Marca marca = new Marca();
        marca.setNombre(marcaDto.getNombre());
        marca.setPaisOrigen(marcaDto.getPaisOrigen());

        marcaRepository.save(marca);
        return marca;
    }
}
