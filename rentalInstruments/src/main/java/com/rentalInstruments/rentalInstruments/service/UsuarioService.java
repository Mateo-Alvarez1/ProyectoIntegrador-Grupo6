
package com.rentalInstruments.rentalInstruments.service;

import com.amazonaws.services.connect.model.UserNotFoundException;
import com.rentalInstruments.rentalInstruments.Repository.Entities.Instrumento;
import com.rentalInstruments.rentalInstruments.Repository.Entities.Usuario;
import com.rentalInstruments.rentalInstruments.Repository.InstrumentoRepository;
import com.rentalInstruments.rentalInstruments.Repository.UsuarioRepository;
import com.rentalInstruments.rentalInstruments.exceptions.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final InstrumentoRepository instrumentoRepository;

    public List<Usuario> listarUsuarios() throws ResourceNotFoundException {
        List<Usuario> usuarios = usuarioRepository.findAll();
        if (usuarios.isEmpty()){
            log.error("la lista de usuario esta vacia");
            throw new ResourceNotFoundException("No se encuentra ningun usuario en la lista");
        }
        return usuarios;
    }
    public Usuario agregarInstrumentoFavorito(Long usuarioId, Long instrumentoId) throws ResourceNotFoundException {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new UserNotFoundException("Usuario no encontrado"));

        Instrumento instrumento = instrumentoRepository.findById(instrumentoId)
                .orElseThrow(() -> new ResourceNotFoundException("Instrumento no encontrado"));

        usuario.agregarInstrumentoFavorito(instrumento);
        usuarioRepository.save(usuario);

        return usuario;
    }
    public Usuario quitarInstrumentoFavorito(Long usuarioId, Long instrumentoId) throws ResourceNotFoundException {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new UserNotFoundException("Usuario no encontrado"));

        Instrumento instrumento = instrumentoRepository.findById(instrumentoId)
                .orElseThrow(() -> new ResourceNotFoundException("Instrumento no encontrado"));

        usuario.quitarInstrumentoFavorito(instrumento);
        usuarioRepository.save(usuario);

        return usuario;
    }
}


//package com.rentalInstruments.rentalInstruments.service;
//
//import com.rentalInstruments.rentalInstruments.Repository.Entities.Usuario;
//import com.rentalInstruments.rentalInstruments.Repository.UsuarioRepository;
//import com.rentalInstruments.rentalInstruments.model.UsuarioDto;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.stereotype.Service;
//
//import java.util.ArrayList;
//import java.util.List;
//
//@Service
//@RequiredArgsConstructor
//@Slf4j
//public class UsuarioService {
//    private final UsuarioRepository usuarioRepository;
//
//    public UsuarioDto crearUsuario(Usuario usuario) {
//        Usuario usuarioRegistrado = usuarioRepository.save(usuario);
//        return usuarioAUsuarioDTO(usuarioRegistrado);
//    }
//    public List<UsuarioDto> listarTodos() {
//        List<Usuario> listaUsuarios = usuarioRepository.findAll();
//        List<UsuarioDto> usuarioDtoList = new ArrayList<>();
//        for (Usuario usuario : listaUsuarios) {
//            usuarioDtoList.add(usuarioAUsuarioDTO(usuario));
//        }
//        return usuarioDtoList;
//    }
//
//    private UsuarioDto usuarioAUsuarioDTO(Usuario usuario) {
//
//        UsuarioDto usuarioDto = new UsuarioDto();
//        usuarioDto.setId(usuario.getId());
//        usuarioDto.setNombre(usuario.getNombre());
//        usuarioDto.setApellido(usuario.getApellido());
//        usuarioDto.setEmail(usuario.getEmail());
//        usuarioDto.setPassword(usuario.getPassword());
//        return usuarioDto;
//
//    }
//    public Usuario DtoAUsuario(UsuarioDto usuarioDto) {
//        Usuario usuario = new Usuario();
//        usuario.setId(usuarioDto.getId());
//        usuario.setNombre(usuarioDto.getNombre());
//        usuario.setApellido(usuarioDto.getApellido());
//        usuario.setEmail(usuarioDto.getEmail());
//        usuario.setPassword(usuarioDto.getPassword());
//        return usuario;
//    }
//
//}

