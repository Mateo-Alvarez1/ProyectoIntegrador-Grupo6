package com.rentalInstruments.rentalInstruments.controller;
import com.rentalInstruments.rentalInstruments.Repository.Entities.Role;
import com.rentalInstruments.rentalInstruments.Repository.Entities.Usuario;
import com.rentalInstruments.rentalInstruments.exceptions.ObjectAlreadyExists;
import com.rentalInstruments.rentalInstruments.model.AuthenticationRequest;
import com.rentalInstruments.rentalInstruments.model.AuthenticationResponse;
import com.rentalInstruments.rentalInstruments.model.RegisterRequest;
import com.rentalInstruments.rentalInstruments.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/auth")
<<<<<<< HEAD
=======
@RequiredArgsConstructor
>>>>>>> d390bf04f17160395e12ba69bcefa8758094ab70
@CrossOrigin
public class AuthController {

     @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/registrar")
    public ResponseEntity<Usuario> registrarUsuario(@RequestBody RegisterRequest registerRequest) throws ObjectAlreadyExists {
        return ResponseEntity.ok(authenticationService.registrar(registerRequest , Role.ROLE_USUARIO ));
    }
    @PostMapping("/registrarAdmin")
    public ResponseEntity<Usuario> registrarAdmin(@RequestBody RegisterRequest registerRequest) throws ObjectAlreadyExists {
        return ResponseEntity.ok(authenticationService.registrar(registerRequest , Role.ROLE_ADMIN));
    }

   @PostMapping("/autenticar")
    public ResponseEntity<AuthenticationResponse> autenticar(@RequestBody AuthenticationRequest authenticationRequest){
        return ResponseEntity.ok(authenticationService.autenticar(authenticationRequest));
    }
<<<<<<< HEAD
    @PostMapping("/asignar/{email}")
    public ResponseEntity<Usuario> asignarRolAdmin(@PathVariable String email) throws ObjectAlreadyExists {
        return ResponseEntity.ok(authenticationService.asignarRolAdmin(email));
    }

    @PostMapping("/quitar/{email}")
    public ResponseEntity<Usuario> quitarRolAdmin(@PathVariable String email) throws ObjectAlreadyExists {
        return ResponseEntity.ok(authenticationService.quitarRolAdmin(email));
    }


=======
    @PostMapping("/asignar")
    public ResponseEntity<Usuario> asignarRolAdmin(@RequestBody String email) throws ObjectAlreadyExists {
        return ResponseEntity.ok(authenticationService.asignarRolAdmin(email));
    }

@PutMapping("/{email}/quitar-rol-admin")
public ResponseEntity<String> quitarRolAdmin(@PathVariable String email) {
    Usuario usuario = authenticationService.quitarRolAdmin(email);

    if (usuario == null) {
        return ResponseEntity.badRequest().body("El usuario no tiene el rol de administrador");
    }

    return ResponseEntity.ok("Rol de administrador eliminado para el usuario con email: " + email + ".");
>>>>>>> d390bf04f17160395e12ba69bcefa8758094ab70
}
}




