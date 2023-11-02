package com.rentalInstruments.rentalInstruments.controller;

import com.rentalInstruments.rentalInstruments.Repository.Entities.Instrumento;
import com.rentalInstruments.rentalInstruments.exceptions.ObjectAlreadyExists;
import com.rentalInstruments.rentalInstruments.exceptions.ResourceNotFoundException;
import com.rentalInstruments.rentalInstruments.model.InstrumentoDto;
import com.rentalInstruments.rentalInstruments.service.InstrumentoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/instrumentos")
@RequiredArgsConstructor
public class InstrumentoController {


    private final InstrumentoService instrumentoService;

    @PostMapping
    public ResponseEntity<Instrumento> agregarInstrumento(@RequestBody InstrumentoDto instrumentoDto) throws ObjectAlreadyExists {
        return ResponseEntity.ok(instrumentoService.agregarInstrumento(instrumentoDto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerInstrumento(@PathVariable Long id) throws ResourceNotFoundException {
        instrumentoService.agregarStock(id);
        return ResponseEntity.ok("Instrumento con id : " + id + "encontrado satisfactoriamente");
    }

    @PutMapping("/editar-categoria")
    public ResponseEntity<String> CambiarCategoria(@PathVariable  Long instrumentoId , @PathVariable  Long nuevaCategoriaId) throws ResourceNotFoundException {
        instrumentoService.editarCategoria(instrumentoId, nuevaCategoriaId);
        return ResponseEntity.ok("Has cambiado la categoría exitosamente");
    }
}
