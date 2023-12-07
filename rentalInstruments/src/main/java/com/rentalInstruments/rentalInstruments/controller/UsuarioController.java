package com.rentalInstruments.rentalInstruments.controller;

import com.rentalInstruments.rentalInstruments.Repository.Entities.Instrumento;
import com.rentalInstruments.rentalInstruments.Repository.Entities.Usuario;
import com.rentalInstruments.rentalInstruments.exceptions.ResourceNotFoundException;
import com.rentalInstruments.rentalInstruments.service.IUsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequiredArgsConstructor

@RequestMapping("api/v1/usuarios")
public class UsuarioController {
    @Autowired
    private final IUsuarioService usuarioService;


    @GetMapping("/listar")
    public ResponseEntity<List<Usuario>> listarUsuarios() throws ResourceNotFoundException {
        return ResponseEntity.ok(usuarioService.listarUsuarios());
    }
    @PostMapping("/{usuarioEmail}/instrumentos/{instrumentoId}/favorito")
    public ResponseEntity<Usuario> agregarInstrumentoFavorito(
            @PathVariable String usuarioEmail, @PathVariable Long instrumentoId) throws ResourceNotFoundException {
        Usuario usuario = usuarioService.agregarInstrumentoFavorito(usuarioEmail, instrumentoId);
        return new ResponseEntity<>(usuario, HttpStatus.OK);
    }

    @DeleteMapping("/{usuarioEmail}/instrumentos/{instrumentoId}/favorito")
    public ResponseEntity<Usuario> quitarInstrumentoFavorito(
            @PathVariable String usuarioEmail, @PathVariable Long instrumentoId) throws ResourceNotFoundException {
        Usuario usuario = usuarioService.quitarInstrumentoFavorito(usuarioEmail, instrumentoId);
        return new ResponseEntity<>(usuario, HttpStatus.OK);
    }
    @GetMapping("/{usuarioEmail}/listar")
public ResponseEntity<List<Instrumento>> listarFavoritos(@PathVariable String usuarioEmail) throws ResourceNotFoundException{
    List<Instrumento> instrumentosFavoritos = usuarioService.listarInstrumentosFavoritos(usuarioEmail);
    return  ResponseEntity.ok(instrumentosFavoritos);
    }

}

