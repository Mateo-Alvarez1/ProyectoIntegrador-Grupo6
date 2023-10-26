package com.rentalInstruments.rentalInstruments.controller;

import com.rentalInstruments.rentalInstruments.Repository.Entities.Categoria;
import com.rentalInstruments.rentalInstruments.Repository.Entities.Instrumento;
import com.rentalInstruments.rentalInstruments.Repository.Entities.Marca;
import com.rentalInstruments.rentalInstruments.Repository.Entities.Modelo;
import com.rentalInstruments.rentalInstruments.exceptions.ObjectAlreadyExists;
import com.rentalInstruments.rentalInstruments.model.CategoriaDto;
import com.rentalInstruments.rentalInstruments.model.InstrumentoDto;
import com.rentalInstruments.rentalInstruments.model.MarcaDto;
import com.rentalInstruments.rentalInstruments.model.ModeloDto;
import com.rentalInstruments.rentalInstruments.service.CategoriaService;
import com.rentalInstruments.rentalInstruments.service.InstrumentoService;
import com.rentalInstruments.rentalInstruments.service.MarcaService;
import com.rentalInstruments.rentalInstruments.service.ModeloService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/instrumentos")
@RequiredArgsConstructor
public class InstrumentoController {


    private final InstrumentoService instrumentoService;
    private final MarcaService marcaService;
    private final CategoriaService categoriaService;
    private final ModeloService modeloService;

    @PostMapping
    public ResponseEntity<Instrumento> agregarInstrumento(@RequestBody InstrumentoDto instrumentoDto) throws ObjectAlreadyExists {
        return ResponseEntity.ok(instrumentoService.agregarInstrumento(instrumentoDto));
    }

    @PostMapping("/marca")
    public ResponseEntity<Marca> agregarMarca(@RequestBody MarcaDto marcaDto){
        return ResponseEntity.ok(marcaService.agregarMarca(marcaDto));
    }

    @PostMapping("/modelo")
    public ResponseEntity<Modelo> agregarModelo(@RequestBody ModeloDto modeloDto){
        return ResponseEntity.ok(modeloService.agregarModelo(modeloDto));
    }

    @PostMapping("/categoria")
    public ResponseEntity<Categoria> agregarCategoria(@RequestBody CategoriaDto categoriaDto){
        return ResponseEntity.ok(categoriaService.agregarCategoria(categoriaDto));
    }

    @PostMapping("/{id}")
    public ResponseEntity<String> agregarStock(@PathVariable Long id){
        instrumentoService.agregarStock(id);
        return ResponseEntity.ok("Stock agregado correctamente");
    }

}
