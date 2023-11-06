package com.rentalInstruments.rentalInstruments.controller;

import com.rentalInstruments.rentalInstruments.Repository.Entities.Role;
import com.rentalInstruments.rentalInstruments.Repository.Entities.Usuario;
import com.rentalInstruments.rentalInstruments.model.AuthenticationRequest;
import com.rentalInstruments.rentalInstruments.model.AuthenticationResponse;
import com.rentalInstruments.rentalInstruments.model.RegisterRequest;
import com.rentalInstruments.rentalInstruments.exceptions.ObjectAlreadyExists;
import com.rentalInstruments.rentalInstruments.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationService authenticationService;

    @PostMapping("/registrar")
    public ResponseEntity<String> registrarUsuario(@RequestBody RegisterRequest registerRequest) throws ObjectAlreadyExists {
        return ResponseEntity.ok(authenticationService.registrar(registerRequest , Role.ROLE_USUARIO ));
    }
    @PostMapping("/registrarAdmin")
    public ResponseEntity<String> registrarAdmin(@RequestBody RegisterRequest registerRequest) throws ObjectAlreadyExists {
        return ResponseEntity.ok(authenticationService.registrar(registerRequest , Role.ROLE_ADMIN));
    }

   @PostMapping("/autenticar")
    public ResponseEntity<AuthenticationResponse> autenticar(@RequestBody AuthenticationRequest authenticationRequest) throws ObjectAlreadyExists {
        return ResponseEntity.ok(authenticationService.autenticar(authenticationRequest));
    }
    @PostMapping("/asignarRol")
    public ResponseEntity<Usuario> asignarRolAdmin(@RequestBody String email) throws ObjectAlreadyExists {
        return ResponseEntity.ok(authenticationService.asignarRolAdmin(email));
    }





}
