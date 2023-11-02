package com.rentalInstruments.rentalInstruments.controller;

import com.rentalInstruments.rentalInstruments.Repository.Entities.Categoria;
import com.rentalInstruments.rentalInstruments.Repository.Entities.Instrumento;
import com.rentalInstruments.rentalInstruments.exceptions.ObjectAlreadyExists;
import com.rentalInstruments.rentalInstruments.exceptions.ResourceNotFoundException;
import com.rentalInstruments.rentalInstruments.model.InstrumentoDto;
import com.rentalInstruments.rentalInstruments.service.InstrumentoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/instrumentos")
@RequiredArgsConstructor
public class InstrumentoController {


    private final InstrumentoService instrumentoService;
//    private final ImagenService imagenService;

    @PostMapping
    public ResponseEntity<Instrumento> agregarInstrumento(@RequestBody InstrumentoDto instrumentoDto) throws ObjectAlreadyExists {
        return ResponseEntity.ok(instrumentoService.agregarInstrumento(instrumentoDto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerInstrumento(@PathVariable Long id) throws ResourceNotFoundException {
        instrumentoService.agregarStock(id);
        return ResponseEntity.ok("Instrumento con id : " + id + "encontrado satisfactoriamente");
    }


    @PutMapping("/categoria")
    public ResponseEntity<?> CambiarCategoria(@RequestBody InstrumentoDto instrumentoDto) throws ResourceNotFoundException {
        return ResponseEntity.ok(instrumentoService.editarCategoria(instrumentoDto));
    }



//    @GetMapping
//    public ResponseEntity<List<Imagen>> listarImagenes(){
//        return ResponseEntity.ok(imagenService.listarImagenes());
//    }
//
//    @PostMapping("/{instrumentoId}") // /api/v1/imagenes/1
//    public ResponseEntity<Imagen> agregarImagen(@RequestBody ImagenDto imagenDto, @RequestParam Long instrumentoId) throws BadRequestException {
//        return ResponseEntity.ok(imagenService.agregarImagen(imagenDto, instrumentoId));
//    }


}
