package com.rentalInstruments.rentalInstruments.controller;

import com.rentalInstruments.rentalInstruments.Repository.Entities.Instrumento;
import com.rentalInstruments.rentalInstruments.model.InstrumentoDto;
import com.rentalInstruments.rentalInstruments.service.InstrumentoService;
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

    @PostMapping
    public ResponseEntity<Instrumento> agregarInstrumento(@RequestBody InstrumentoDto instrumentoDto){
        return ResponseEntity.ok(instrumentoService.agregarInstrumento(instrumentoDto));
    }

}
