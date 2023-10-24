package com.rentalInstruments.rentalInstruments.service;

import com.rentalInstruments.rentalInstruments.Repository.Entities.Modelo;
import com.rentalInstruments.rentalInstruments.Repository.ModeloRepository;
import com.rentalInstruments.rentalInstruments.model.ModeloDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ModeloService implements ModeloInterface{

    @Autowired
    private ModeloRepository modeloRepository;


    @Override
    public Modelo agregarModelo(ModeloDto modeloDto) {
        Modelo modelo = new Modelo();
        modelo.setNumeroSerie(modeloDto.getNumeroSerie());

        modeloRepository.save(modelo);
        return modelo;
    }


}
