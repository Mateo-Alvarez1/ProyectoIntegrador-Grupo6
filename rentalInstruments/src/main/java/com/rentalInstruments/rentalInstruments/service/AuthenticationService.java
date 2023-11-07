package com.rentalInstruments.rentalInstruments.service;
import com.rentalInstruments.rentalInstruments.Repository.Entities.Role;
import com.rentalInstruments.rentalInstruments.Repository.Entities.Usuario;
import com.rentalInstruments.rentalInstruments.model.AuthenticationRequest;
import com.rentalInstruments.rentalInstruments.model.AuthenticationResponse;
import com.rentalInstruments.rentalInstruments.model.RegisterRequest;
import com.rentalInstruments.rentalInstruments.Repository.UsuarioRepository;
import com.rentalInstruments.rentalInstruments.exceptions.ObjectAlreadyExists;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

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
        var token = jwtService.generateToken(user);

        return AuthenticationResponse.builder()
                .token(token)
                .build();
    }




    //         REVISAR
    // TODO -> QUITAR ROLE_ADMIN

    public Usuario asignarRolAdmin(String userEmail) throws ObjectAlreadyExists {

        // TRAEMOS EL CONTEXTO ACTUAL DE CONFIGURACION
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        var user = usuarioRepository.findByEmail(userEmail).orElseThrow( () -> new UsernameNotFoundException("El usuario no se encuentra"));

        if (user.getRole() == Role.ROLE_ADMIN){
            log.error("El usuario ya tiene el rol de administrador");
            throw new ObjectAlreadyExists("El usuario ya tiene el role admin");
        }

        user.setRole(Role.ROLE_ADMIN);
        log.info("Rol asignado correctamente");
        usuarioRepository.save(user);

        //ASIGNAR NUEVO ROL A LA LISTA DE AUTORIDADES
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));


        //GENERAR NUEVO OBJETO AUTHENTICATION CON LAS AUTORITIES ACTUALIZADAS
        Authentication newAuthentication = new UsernamePasswordAuthenticationToken(authentication.getPrincipal(), authentication.getCredentials(), authorities);

        //ACTUALIZAR CONTEXTO
        SecurityContextHolder.getContext().setAuthentication(newAuthentication);
        log.info("Rol asignado correctamente");
        return user;
    }


}
