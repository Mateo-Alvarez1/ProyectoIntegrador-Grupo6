package com.rentalInstruments.rentalInstruments.service;

import com.rentalInstruments.rentalInstruments.Repository.Entities.Usuario;
import com.rentalInstruments.rentalInstruments.Repository.UsuarioRepository;
import com.rentalInstruments.rentalInstruments.exceptions.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class UsuarioService implements IUsuarioService{

    private final UsuarioRepository usuarioRepository;
    @Override
    public List<Usuario> listarUsuarios() throws ResourceNotFoundException {
        List<Usuario> usuarios = usuarioRepository.findAll();
        if (usuarios.isEmpty()){
            log.error("la lista de usuario esta vacia");
            throw new ResourceNotFoundException("No se encuentra ningun usuario en la lista");
        }
        return usuarios;
    }
}
