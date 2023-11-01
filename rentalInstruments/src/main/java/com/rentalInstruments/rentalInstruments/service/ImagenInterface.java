package com.rentalInstruments.rentalInstruments.service;

import com.rentalInstruments.rentalInstruments.Repository.Entities.Imagen;
import com.rentalInstruments.rentalInstruments.exceptions.BadRequestException;
import com.rentalInstruments.rentalInstruments.model.ImagenDto;

import java.util.List;

public interface ImagenInterface {

    Imagen agregarImagen(ImagenDto imagenDto, Long instrumentoId) throws BadRequestException;
    List<Imagen> listarImagenes();

}
