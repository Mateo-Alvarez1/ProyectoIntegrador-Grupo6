package com.rentalInstruments.rentalInstruments.controller;

import com.rentalInstruments.rentalInstruments.Repository.Entities.Imagen;
import com.rentalInstruments.rentalInstruments.exceptions.BadRequestException;
import com.rentalInstruments.rentalInstruments.model.ImagenDto;
import com.rentalInstruments.rentalInstruments.service.ImagenService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/imagenes")
@RequiredArgsConstructor
public class ImagenController {

    private final ImagenService imagenService;

    @GetMapping
    public ResponseEntity<List<Imagen>> listarImagenes(){
        return ResponseEntity.ok(imagenService.listarImagenes());
    }

    @PostMapping("/{instrumentoId}") // /api/v1/imagenes/1
    public ResponseEntity<Imagen> agregarImagen(@RequestBody ImagenDto imagenDto, @RequestParam Long instrumentoId) throws BadRequestException {
        return ResponseEntity.ok(imagenService.agregarImagen(imagenDto, instrumentoId));
    }
}
