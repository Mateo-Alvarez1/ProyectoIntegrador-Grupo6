package com.rentalInstruments.controller;

import com.rentalInstruments.entities.Instrumento;
import com.rentalInstruments.service.InstrumentoService;
import com.sun.istack.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.rentalInstruments.exception.BadRequestException;
import java.util.Optional;

@RestController
@RequestMapping
public class InstrumentoController {
    @Autowired
    private InstrumentoService instrumentoService;
    @PostMapping
    public ResponseEntity<Instrumento> agregarInstrumento(@RequestBody @NotNull Instrumento instrumento) {
        return ResponseEntity.ok(instrumentoService.agregarInstrumento(instrumento));
    }


}

