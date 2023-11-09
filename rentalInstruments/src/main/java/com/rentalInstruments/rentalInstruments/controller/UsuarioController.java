package com.rentalInstruments.rentalInstruments.controller;

import com.rentalInstruments.rentalInstruments.Repository.Entities.Instrumento;
import com.rentalInstruments.rentalInstruments.exceptions.ObjectAlreadyExists;
import com.rentalInstruments.rentalInstruments.exceptions.ResourceNotFoundException;
import com.rentalInstruments.rentalInstruments.model.InstrumentoDto;
import com.rentalInstruments.rentalInstruments.model.UsuarioDto;
import com.rentalInstruments.rentalInstruments.service.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/usuarios")
@CrossOrigin
@RequiredArgsConstructor
public class UsuarioController {
    @Autowired
private UsuarioService usuarioService;
@PostMapping

public ResponseEntity<UsuarioDto> crearUsuario(@RequestBody UsuarioDto usuarioDto)throws ObjectAlreadyExists{

        return ResponseEntity.ok(usuarioService.crearUsuario(usuarioDto));

    }
@GetMapping
    public ResponseEntity<List<UsuarioDto>> listarTodos() throws ResourceNotFoundException {
        return ResponseEntity.ok(usuarioService.listarTodos());
    }
}