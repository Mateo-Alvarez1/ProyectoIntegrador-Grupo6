package com.rentalInstruments.rentalInstruments.service;

import com.rentalInstruments.rentalInstruments.Repository.Entities.Usuario;
import com.rentalInstruments.rentalInstruments.Repository.UsuarioRepository;
import com.rentalInstruments.rentalInstruments.exceptions.ResourceNotFoundException;
import com.rentalInstruments.rentalInstruments.model.UsuarioDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class UsuarioService {
    private final UsuarioRepository usuarioRepository;

public UsuarioDto crearUsuario (Usuario usuario){
        Usuario usuarioRegistrado = usuarioRepository.save (usuario);
    if(usuarioRegistrado.isPresent(){
        return ResponseEntity.ok(turnoService.guardarTurno(turno));
    }else {
        return ResponseEntity.badRequest().build();
    }
    return usuarioAUsuarioDTO(usuarioRegistrado);
    }
    public List<UsuarioDto> listarTodos() throws ResourceNotFoundException {
        List<Usuario> listaUsuarios = usuarioRepository.findAll();
        List<UsuarioDto> usuarioDtoList = new ArrayList<>();
        for (Usuario usuario : listaUsuarios) {
            usuarioDtoList.add(usuarioAUsuarioDTO(usuario));
        }
        return usuarioDtoList;
    }

    private UsuarioDto usuarioAUsuarioDTO(Usuario usuario) {

        UsuarioDto usuarioDto = new UsuarioDto();
        usuarioDto.setId(usuario.getId());
        usuarioDto.setNombre(usuario.getNombre());
        usuarioDto.setEmail(usuario.getEmail());
        usuarioDto.setPassword(usuario.getPassword());
        return usuarioDto;

    }

}
