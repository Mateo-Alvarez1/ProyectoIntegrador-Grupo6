package com.rentalInstruments.rentalInstruments.service;

import com.rentalInstruments.rentalInstruments.Repository.CategoriaRepository;
import com.rentalInstruments.rentalInstruments.Repository.Entities.Categoria;
import com.rentalInstruments.rentalInstruments.model.CategoriaDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CategoriaService implements CategoriaInterface{

    private final CategoriaRepository categoriaRepository;
    @Override
    public Categoria agregarCategoria(CategoriaDto categoriaDto) {
        Categoria categoria = new Categoria();
        categoria.setNombre(categoriaDto.getNombre());

        categoriaRepository.save(categoria);
        return categoria;
    }
}
