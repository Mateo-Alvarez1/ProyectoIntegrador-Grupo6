package com.rentalInstruments.rentalInstruments.controller;

import com.rentalInstruments.rentalInstruments.Repository.Entities.Categoria;
import com.rentalInstruments.rentalInstruments.exceptions.ObjectAlreadyExists;
import com.rentalInstruments.rentalInstruments.exceptions.ResourceNotFoundException;
import com.rentalInstruments.rentalInstruments.model.CategoriaDto;
import com.rentalInstruments.rentalInstruments.service.CategoriaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/categoria")
@RequiredArgsConstructor
public class CategoriaController {
    private final CategoriaService categoriaService ;
    @PostMapping
    public ResponseEntity<Categoria> agregarCategoria(@RequestBody CategoriaDto categoriaDto) throws ObjectAlreadyExists {
        return ResponseEntity.ok(categoriaService.agregarCategoria(categoriaDto));
    }
    @DeleteMapping ("/{id}")
    public ResponseEntity<String> eliminarCategoria (@PathVariable  Long id) throws ResourceNotFoundException {
        return ResponseEntity.ok(categoriaService.eliminarCategoria(id).getBody());
    }
}
