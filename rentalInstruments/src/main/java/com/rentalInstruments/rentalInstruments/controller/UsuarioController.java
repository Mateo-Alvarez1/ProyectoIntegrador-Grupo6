<<<<<<< HEAD
package com.rentalInstruments.rentalInstruments.controller;

import com.rentalInstruments.rentalInstruments.Repository.Entities.Usuario;
import com.rentalInstruments.rentalInstruments.exceptions.ResourceNotFoundException;
import com.rentalInstruments.rentalInstruments.service.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/v1/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping("/listar")
    public ResponseEntity<List<Usuario>> listarUsuarios() throws ResourceNotFoundException {
        return ResponseEntity.ok(usuarioService.listarUsuarios());
    }

}
=======
//package com.rentalInstruments.rentalInstruments.controller;
//
//import com.rentalInstruments.rentalInstruments.Repository.Entities.Usuario;
//import com.rentalInstruments.rentalInstruments.exceptions.ObjectAlreadyExists;
//import com.rentalInstruments.rentalInstruments.exceptions.ResourceNotFoundException;
//import com.rentalInstruments.rentalInstruments.model.UsuarioDto;
//import com.rentalInstruments.rentalInstruments.service.UsuarioService;
//import io.swagger.v3.oas.annotations.parameters.RequestBody;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PostMapping;
//
//import java.util.List;
//
//public class UsuarioController {
//    @Autowired
//    private UsuarioService usuarioService;
//    @PostMapping
//    public ResponseEntity<UsuarioDto> crearUsuario(@RequestBody UsuarioDto usuarioDto) throws ObjectAlreadyExists {
//        Usuario usuario = usuarioService.DtoAUsuario(usuarioDto);
//        UsuarioDto usuarioCreado = usuarioService.crearUsuario(usuario);
//        return ResponseEntity.ok(usuarioCreado);
//    }
//    @GetMapping
//    public ResponseEntity<List<UsuarioDto>> listarTodos() throws ResourceNotFoundException {
//        return ResponseEntity.ok(usuarioService.listarTodos());
//    }
//}
>>>>>>> d390bf04f17160395e12ba69bcefa8758094ab70
