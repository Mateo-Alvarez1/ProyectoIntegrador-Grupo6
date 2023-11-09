package com.rentalInstruments.rentalInstruments.controller;

import com.rentalInstruments.rentalInstruments.exceptions.ResourceNotFoundException;
import com.rentalInstruments.rentalInstruments.model.UsuarioDto;
import com.rentalInstruments.rentalInstruments.service.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/v1/usuarios")
@CrossOrigin
@RequiredArgsConstructor
public class UsuarioController {
    @Autowired
private UsuarioService usuarioService;

@GetMapping
    public ResponseEntity<List<UsuarioDto>> listarTodos() throws ResourceNotFoundException {
        return ResponseEntity.ok(usuarioService.listarTodos());
    }
}