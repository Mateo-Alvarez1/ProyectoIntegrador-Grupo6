package com.rentalInstruments.rentalInstruments.service;

import com.amazonaws.services.connect.model.UserNotFoundException;
import com.rentalInstruments.rentalInstruments.Repository.Entities.Instrumento;
import com.rentalInstruments.rentalInstruments.Repository.Entities.Usuario;
import com.rentalInstruments.rentalInstruments.Repository.InstrumentoRepository;
import com.rentalInstruments.rentalInstruments.Repository.UsuarioRepository;
import com.rentalInstruments.rentalInstruments.exceptions.ResourceNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class UsuarioService implements IUsuarioService{

    private final UsuarioRepository usuarioRepository;
    private final InstrumentoRepository instrumentoRepository;


    @Override
    public List<Usuario> listarUsuarios() throws ResourceNotFoundException {
        List<Usuario> usuarios = usuarioRepository.findAll();
        if (usuarios.isEmpty()){
            log.error("la lista de usuario esta vacia");
            throw new ResourceNotFoundException("No se encuentra ningun usuario en la lista");
        }
        return usuarios;
    }

    @Override
    public Usuario agregarInstrumentoFavorito(String usuarioEmail, Long instrumentoId) throws ResourceNotFoundException {
        Usuario usuario = usuarioRepository.findByEmail(usuarioEmail)
                .orElseThrow(() -> new UserNotFoundException("Usuario no encontrado"));

        Instrumento instrumento = instrumentoRepository.findById(instrumentoId)
                .orElseThrow(() -> new ResourceNotFoundException("Instrumento no encontrado"));

        usuario.agregarInstrumentoFavorito(instrumento);
        usuarioRepository.save(usuario);

        return usuario;
    }



    @Override
    public Usuario quitarInstrumentoFavorito(String usuarioEmail, Long instrumentoId) throws ResourceNotFoundException {
        Usuario usuario = usuarioRepository.findByEmail(usuarioEmail)
                .orElseThrow(() -> new UserNotFoundException("Usuario no encontrado"));

        Instrumento instrumento = instrumentoRepository.findById(instrumentoId)
                .orElseThrow(() -> new ResourceNotFoundException("Instrumento no encontrado"));

        usuario.quitarInstrumentoFavorito(instrumento);
        usuarioRepository.save(usuario);

        return usuario;
    }
    public List<Instrumento> listarInstrumentosFavoritos(String usuarioEmail) throws ResourceNotFoundException {
        Usuario usuario = usuarioRepository.findByEmail(usuarioEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));

        return usuario.obtenerInstrumentosFavoritos();
    }

    public void quitarInstrumentoFav(Long instrumentoId) throws ResourceNotFoundException {
        List<Usuario> usuarios = usuarioRepository.findAll();


        Instrumento instrumento = instrumentoRepository.findById(instrumentoId)
                .orElseThrow(() -> new ResourceNotFoundException("Instrumento no encontrado"));

        for(Usuario usuario: usuarios) {
            if(usuario.obtenerInstrumentosFavoritos().contains(instrumento)){
                usuario.quitarInstrumentoFavorito(instrumento);
                usuarioRepository.save(usuario);
            }
        }



    }

}
