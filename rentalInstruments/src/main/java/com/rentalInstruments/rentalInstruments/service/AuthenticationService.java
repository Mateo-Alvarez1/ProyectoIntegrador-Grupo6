package com.rentalInstruments.rentalInstruments.service;

import com.rentalInstruments.rentalInstruments.Repository.Entities.Role;
import com.rentalInstruments.rentalInstruments.Repository.Entities.Usuario;
import com.rentalInstruments.rentalInstruments.Repository.UsuarioRepository;
import com.rentalInstruments.rentalInstruments.exceptions.ObjectAlreadyExists;
import com.rentalInstruments.rentalInstruments.model.AuthenticationRequest;
import com.rentalInstruments.rentalInstruments.model.AuthenticationResponse;
import com.rentalInstruments.rentalInstruments.model.RegisterRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthenticationService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    public final JwtService jwtService;

    public Usuario registrar(RegisterRequest registerRequest , Role role ) throws ObjectAlreadyExists {
        if (usuarioRepository.findByEmail(registerRequest.getEmail()).isPresent()) {
            log.error("Ya se encuentra un usuario registrado con ese email");
            throw new ObjectAlreadyExists("Ya se encuentra registrado un usuario con ese email");
        }
        var usuario = Usuario.builder()
                .nombre(registerRequest.getNombre())
                .apellido(registerRequest.getApellido())
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .role(role)
                .build();

        usuarioRepository.save(usuario);

        return usuario;
    }


    public AuthenticationResponse autenticar(AuthenticationRequest authenticationRequest) {

        authenticationManager.authenticate( new UsernamePasswordAuthenticationToken(
                authenticationRequest.getEmail(),
                authenticationRequest.getPassword()
        ));

        var user = usuarioRepository.findByEmail(authenticationRequest.getEmail()).orElseThrow(() -> new UsernameNotFoundException("El usuario no se encuentra"));
        System.out.println(user);
        var token = jwtService.generateToken(new HashMap<>() , user , user.getNombre() , user.getApellido() , user.getRole());

        return AuthenticationResponse.builder()
                .token(token)
                .build();
    }


    // TODO -> QUITAR ROLE_ADMIN

    public Usuario asignarRolAdmin(String email) throws ObjectAlreadyExists {

        var user = usuarioRepository.findByEmail(email).orElseThrow( () -> new UsernameNotFoundException("El usuario no se encuentra"));
        System.out.println(user);

        if (user.getRole() == Role.ROLE_ADMIN){
            log.error("El usuario ya tiene el rol de administrador");
            throw new ObjectAlreadyExists("El usuario ya tiene el role admin");
        }

        user.setRole(Role.ROLE_ADMIN);
        log.info("Rol asignado correctamente");
        usuarioRepository.save(user);


        log.info("Rol asignado correctamente");
        return user;
    }
    // TODO -> QUITAR ROLE_ADMIN
//    public Usuario quitarRolAdmin(String email) throws ObjectAlreadyExists {
//        var user = usuarioRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("El usuario no se encuentra"));
//        System.out.println(user);
//
//        if (user.getRole() != Role.ROLE_ADMIN) {
//            log.error("El usuario no tiene el rol de administrador");
//            throw new ObjectAlreadyExists("El usuario no tiene el role admin");
//        }
//
//        user.setRole(null); // Asigna null para quitar el rol de administrador
//        log.info("Rol de administrador eliminado correctamente");
//        usuarioRepository.save(user);
//
//        return user;
//    }
    public Usuario quitarRolAdmin(String email) {
        var user = usuarioRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("El usuario no se encuentra"));

        if (user.getRole() != Role.ROLE_ADMIN) {
            log.error("El usuario no tiene el rol de administrador");
            // Podrías lanzar una excepción específica o simplemente devolver null o un objeto especial para indicar que no tiene el rol
            return null; // O lanzar una excepción diferente
        }

        user.setRole(null);
        log.info("Rol de administrador eliminado correctamente");
        usuarioRepository.save(user);

        return user;
    }


}
