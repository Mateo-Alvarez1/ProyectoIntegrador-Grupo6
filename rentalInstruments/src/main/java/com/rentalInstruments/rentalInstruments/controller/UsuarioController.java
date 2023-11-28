
package com.rentalInstruments.rentalInstruments.controller;

import com.rentalInstruments.rentalInstruments.Repository.Entities.Usuario;
import com.rentalInstruments.rentalInstruments.exceptions.ResourceNotFoundException;
import com.rentalInstruments.rentalInstruments.service.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/v1/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping("/listar")
    public ResponseEntity<List<Usuario>> listarUsuarios() throws ResourceNotFoundException {
        return ResponseEntity.ok(usuarioService.listarUsuarios());
    }
    @PostMapping("/agregar-favorito")
    public ResponseEntity<Usuario> agregarInstrumentoFavorito(@RequestBody Map<String, Long> request) throws ResourceNotFoundException {
        Long usuarioId = request.get("usuarioId");
        Long instrumentoId = request.get("instrumentoId");

        Usuario usuario = usuarioService.agregarInstrumentoFavorito(usuarioId, instrumentoId);
        return ResponseEntity.ok(usuario);
    }
    @PostMapping("/quitar-favorito/{usuarioId}/{instrumentoId}")
    public ResponseEntity<Usuario> quitarInstrumentoFavorito(@PathVariable Long usuarioId, @PathVariable Long instrumentoId) throws ResourceNotFoundException {
        Usuario usuario = usuarioService.quitarInstrumentoFavorito(usuarioId, instrumentoId);
        return ResponseEntity.ok(usuario);
    }

}

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

