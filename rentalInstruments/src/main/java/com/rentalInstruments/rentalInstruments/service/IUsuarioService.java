package com.rentalInstruments.rentalInstruments.service;
import com.rentalInstruments.rentalInstruments.Repository.Entities.Usuario;
import com.rentalInstruments.rentalInstruments.exceptions.ResourceNotFoundException;

import java.util.List;

public interface IUsuarioService {
    List<Usuario> listarUsuarios() throws ResourceNotFoundException;
}
