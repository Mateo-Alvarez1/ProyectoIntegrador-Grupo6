package com.rentalInstruments.rentalInstruments.controller;

import com.rentalInstruments.rentalInstruments.Repository.Entities.Categoria;
import com.rentalInstruments.rentalInstruments.exceptions.InvalidDataEntry;
import com.rentalInstruments.rentalInstruments.exceptions.ObjectAlreadyExists;
import com.rentalInstruments.rentalInstruments.exceptions.ResourceNotFoundException;
import com.rentalInstruments.rentalInstruments.model.CategoriaDto;
import com.rentalInstruments.rentalInstruments.model.InstrumentoDto;
import com.rentalInstruments.rentalInstruments.service.CategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/categoria")
public class CategoriaController {

    @Autowired
    private CategoriaService categoriaService;

    @PutMapping("/{id}")
    public ResponseEntity<?> CambiarCategoria(@PathVariable Long id , @RequestBody InstrumentoDto instrumentoDto) throws ResourceNotFoundException, ObjectAlreadyExists {
        return ResponseEntity.ok(categoriaService.editarCategoria(id ,instrumentoDto));
    }
    @DeleteMapping("/{id}/{nombre}")
    public ResponseEntity<String> eliminarCategoria(@PathVariable String nombre , @PathVariable Long id) throws InvalidDataEntry {
        return ResponseEntity.ok(categoriaService.eliminarCategoria(nombre , id));
    }

    @GetMapping
    public ResponseEntity<?> listarCategorias() throws ResourceNotFoundException {
        return ResponseEntity.ok(categoriaService.listarCategorias());
    }

    @PostMapping
    public ResponseEntity<?> crearCategoria(@RequestBody CategoriaDto categoriaDto) throws ObjectAlreadyExists {
        return ResponseEntity.ok(categoriaService.crearCategoria(categoriaDto));
    }




}
