package com.rentalInstruments.rentalInstruments.controller;

import com.rentalInstruments.rentalInstruments.Repository.Entities.Instrumento;
import com.rentalInstruments.rentalInstruments.Repository.Entities.Marca;
import com.rentalInstruments.rentalInstruments.Repository.Entities.Modelo;
import com.rentalInstruments.rentalInstruments.model.InstrumentoDto;
import com.rentalInstruments.rentalInstruments.model.MarcaDto;
import com.rentalInstruments.rentalInstruments.model.ModeloDto;
import com.rentalInstruments.rentalInstruments.service.InstrumentoService;
import com.rentalInstruments.rentalInstruments.service.MarcaService;
import com.rentalInstruments.rentalInstruments.service.ModeloService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/instrumentos")
public class InstrumentoController {

    @Autowired
    private InstrumentoService instrumentoService;

    @Autowired
    private MarcaService marcaService;

    @Autowired
    private ModeloService modeloService;

    @PostMapping
    public ResponseEntity<Instrumento> agregarInstrumento(@RequestBody InstrumentoDto instrumentoDto){
        return ResponseEntity.ok(instrumentoService.agregarInstrumento(instrumentoDto));
    }

    @PostMapping("/marca")
    public ResponseEntity<Marca> agregarMarca(@RequestBody MarcaDto marcaDto){
        return ResponseEntity.ok(marcaService.agregarMarca(marcaDto));
    }

    @PostMapping("/modelo")
    public ResponseEntity<Modelo> agregarMarca(@RequestBody ModeloDto modeloDto){
        return ResponseEntity.ok(modeloService.agregarModelo(modeloDto));
    }

}
