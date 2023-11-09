package com.rentalInstruments.rentalInstruments.service;

import com.rentalInstruments.rentalInstruments.Repository.Entities.Usuario;
import com.rentalInstruments.rentalInstruments.Repository.UsuarioRepository;
import com.rentalInstruments.rentalInstruments.exceptions.ResourceNotFoundException;
import com.rentalInstruments.rentalInstruments.model.UsuarioDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class UsuarioService {
    private final UsuarioRepository usuarioRepository;


    public List<UsuarioDto> listarTodos() throws ResourceNotFoundException {
        List<Usuario> listaUsuarios = usuarioRepository.findAll();
        List<UsuarioDto> usuarioDtoList = new ArrayList<>();
        for (Usuario usuario : listaUsuarios) {
            usuarioDtoList.add(usuarioAusuarioDTO(usuario));
        }
        return usuarioDtoList;
    }

    private UsuarioDto usuarioAusuarioDTO(Usuario usuario) {

        UsuarioDto usuarioDto = new UsuarioDto();
        usuarioDto.setId(usuario.getId());
        usuarioDto.setNombre(usuario.getNombre());
        usuarioDto.setEmail(usuario.getEmail());
        usuarioDto.setPassword(usuario.getPassword());
        return usuarioDto;

    }
}
