package com.rentalInstruments.rentalInstruments.service;

import com.rentalInstruments.rentalInstruments.Repository.CategoriaRepository;
import com.rentalInstruments.rentalInstruments.Repository.Entities.Categoria;
import com.rentalInstruments.rentalInstruments.Repository.Entities.Instrumento;
import com.rentalInstruments.rentalInstruments.Repository.InstrumentoRepository;
import com.rentalInstruments.rentalInstruments.exceptions.InvalidDataEntry;
import com.rentalInstruments.rentalInstruments.exceptions.ObjectAlreadyExists;
import com.rentalInstruments.rentalInstruments.exceptions.ResourceNotFoundException;
import com.rentalInstruments.rentalInstruments.model.InstrumentoDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Slf4j
public class CategoriaService implements ICategoriaService{


    @Autowired
    private CategoriaRepository categoriaRepository;
    @Autowired
    private InstrumentoRepository instrumentoRepository;



    @Override
    public String eliminarCategoria(String nombre) throws InvalidDataEntry {
        Optional<Categoria> categoriaOptional = categoriaRepository.findByNombre(nombre);
        if (!categoriaOptional.isPresent()) {
            log.error("No se encontro una categoria con el nombre: " + nombre);
            throw new InvalidDataEntry("Se intento buscar una categoria que no se encuentra en la base de datos");
        }

        if (categoriaOptional.get().getNombre().equals(nombre)) {
            categoriaRepository.deleteByNombre(nombre);
            log.info("Categoria eliminada satisfactoriamente");
        }
        return "Categoria eliminada satisfactoriamente";
    }







    public Instrumento editarCategoria(Long id , InstrumentoDto instrumentoDto) throws ResourceNotFoundException, ObjectAlreadyExists {

        Optional<Instrumento> instrumentoOptional = instrumentoRepository.findById(id);

        if (!instrumentoOptional.isPresent()) {
            log.error("El instrumento con id: " + instrumentoDto.getId() + " no se encuentra en la base de datos");
            throw new ResourceNotFoundException("No existe un instrumento con ese id");
        }
        Instrumento instrumento = instrumentoOptional.get();

        Optional<Categoria> categoriaOptional = categoriaRepository.findByNombre(instrumentoDto.getCategoria().getNombre());
        if(!categoriaOptional.isPresent()){
            Categoria categoria = new Categoria();
            categoria.setNombre(instrumentoDto.getCategoria().getNombre());
            categoriaRepository.save(categoria);
            instrumento.setCategoria(categoria);
        }else{
            instrumento.setCategoria(categoriaOptional.get());
        }

        log.info("Categoria actualizada correctamente");
        instrumentoRepository.save(instrumento);
        return instrumentoOptional.get();
    }
}
