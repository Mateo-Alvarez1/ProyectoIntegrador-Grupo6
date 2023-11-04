//package com.rentalInstruments.rentalInstruments.service;
//
//import com.rentalInstruments.rentalInstruments.Repository.Entities.Imagen;
//import com.rentalInstruments.rentalInstruments.Repository.Entities.Instrumento;
//import com.rentalInstruments.rentalInstruments.Repository.ImagenRepository;
//import com.rentalInstruments.rentalInstruments.Repository.InstrumentoRepository;
//import com.rentalInstruments.rentalInstruments.exceptions.BadRequestException;
//import com.rentalInstruments.rentalInstruments.model.ImagenDto;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//import java.util.Optional;
//
//@Service
//@RequiredArgsConstructor
//@Slf4j
//public class ImagenService implements ImagenInterface{
//
//    @Autowired
//    ImagenRepository imagenRepository;
//
//    @Autowired
//    InstrumentoRepository instrumentoRepository;
//
//
//
//    @Override
//    public Imagen agregarImagen(ImagenDto imagenDto, Long instrumentoId) throws BadRequestException {
//        Optional<Instrumento> instrumento = instrumentoRepository.findById(instrumentoId);
//        if (instrumento.isPresent()){
//            Imagen imagen = new Imagen();
//            imagen.setUrl(imagenDto.getUrl());
//            imagen.setInstrumento(instrumento.get());
//            imagenRepository.save(imagen);
//            log.info("Imagen persistida satisfactoriamente");
//            return imagen;
//        }
//        log.error("No se pudo persistir la imagen porque el instrumento no existe");
//        throw new BadRequestException("No se pudo persistir la imagen porque el instrumento no existe");
//    }
//
//    @Override
//    public List<Imagen> listarImagenes() {
//        return imagenRepository.findAll();
//    }
//}
