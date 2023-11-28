package com.rentalInstruments.rentalInstruments.service;

import com.rentalInstruments.rentalInstruments.Repository.Entities.Usuario;
import com.rentalInstruments.rentalInstruments.exceptions.ResourceNotFoundException;
import com.rentalInstruments.rentalInstruments.model.UsuarioDto;

import java.util.List;

public interface UsuarioInterface {
  List<UsuarioDto> listarTodos()throws ResourceNotFoundException;
 Usuario agregarInstrumentoFavorito() throws ResourceNotFoundException;
 Usuario quitarInstrumentoFavorito() throws ResourceNotFoundException;
}
