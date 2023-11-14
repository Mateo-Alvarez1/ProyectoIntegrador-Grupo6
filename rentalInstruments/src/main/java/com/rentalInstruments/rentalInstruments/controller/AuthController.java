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
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/auth")
@RequiredArgsConstructor
@CrossOrigin
public class AuthController {

    private final AuthenticationService authenticationService;

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
    @PostMapping("/asignar/{email}")
    public ResponseEntity<Usuario> asignarRolAdmin(@PathVariable String email) throws ObjectAlreadyExists {
        return ResponseEntity.ok(authenticationService.asignarRolAdmin(email));
    }

    @PostMapping("/quitar/{email}")
    public ResponseEntity<Usuario> quitarRolAdmin(@PathVariable String email) throws ObjectAlreadyExists {
        return ResponseEntity.ok(authenticationService.quitarRolAdmin(email));
    }

}
