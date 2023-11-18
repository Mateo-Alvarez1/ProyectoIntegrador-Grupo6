package com.rentalInstruments.rentalInstruments.service;

import com.rentalInstruments.rentalInstruments.Repository.CategoriaRepository;
import com.rentalInstruments.rentalInstruments.Repository.Entities.Categoria;
import com.rentalInstruments.rentalInstruments.exceptions.ObjectAlreadyExists;
import com.rentalInstruments.rentalInstruments.exceptions.ResourceNotFoundException;
import com.rentalInstruments.rentalInstruments.model.CategoriaDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class CategoriaService {

    private final CategoriaRepository categoriaRepository;

    public Categoria agregarCategoria(CategoriaDto categoriaDto) throws ObjectAlreadyExists {

        if (categoriaRepository.findByNombre(categoriaDto.getNombre()).isPresent()) {
            log.error("Se intento ingresar una categoria existente " + categoriaDto.getNombre());
            throw new ObjectAlreadyExists("La categoria con nombre " + categoriaDto.getNombre() + " ya se encuentra registrada");
        }

        Categoria categoria = new Categoria();
        categoria.setNombre(categoriaDto.getNombre());
        log.info("Categoria agregada satisfactoriamente");
        categoriaRepository.save(categoria);
        return categoria;
    }
    public ResponseEntity<String> eliminarCategoria(Long id) throws ResourceNotFoundException {
        Optional<Categoria> categoriaBuscada = categoriaRepository.findById(id);
        if (categoriaBuscada.isPresent()) {
            categoriaRepository.delete(categoriaBuscada.get().getId());
            log.info("Se eliminó correctamente la categoría con ID: " + id);
            return ResponseEntity.ok("Se eliminó correctamente la categoría con ID: " + id);
        } else {
            log.warn("No se encontró la categoría con ID: {}", id);
            throw new ResourceNotFoundException("No se encontró el id asociado: " + id);
        }
    }


}