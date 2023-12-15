package com.rentalInstruments.rentalInstruments.service;
import com.rentalInstruments.rentalInstruments.Repository.Entities.Instrumento;
import com.rentalInstruments.rentalInstruments.Repository.Entities.Usuario;
import com.rentalInstruments.rentalInstruments.exceptions.ResourceNotFoundException;

import java.util.List;

public interface IUsuarioService {
    List<Usuario> listarUsuarios() throws ResourceNotFoundException;
    Usuario agregarInstrumentoFavorito(String usuarioEmail, Long instrumentoId) throws ResourceNotFoundException;

    Usuario quitarInstrumentoFavorito(String usuarioEmail,Long instrumentoId) throws ResourceNotFoundException;
    List<Instrumento> listarInstrumentosFavoritos (String usuarioEmail) throws ResourceNotFoundException;
}
