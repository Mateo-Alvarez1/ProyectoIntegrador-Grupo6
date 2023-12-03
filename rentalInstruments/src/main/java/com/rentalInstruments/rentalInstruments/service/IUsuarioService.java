package com.rentalInstruments.rentalInstruments.service;
import com.rentalInstruments.rentalInstruments.Repository.Entities.Instrumento;
import com.rentalInstruments.rentalInstruments.Repository.Entities.Usuario;
import com.rentalInstruments.rentalInstruments.exceptions.ResourceNotFoundException;

import java.util.List;
import java.util.Set;

public interface IUsuarioService {
    List<Usuario> listarUsuarios() throws ResourceNotFoundException;
    Usuario agregarInstrumentoFavorito(Long usuarioId, Long instrumentoId) throws ResourceNotFoundException;

    Usuario quitarInstrumentoFavorito(Long usuarioId,Long instrumentoId) throws ResourceNotFoundException;
    Set<Instrumento> listarInstrumentosFavoritos (Long usuarioId) throws ResourceNotFoundException;
}
