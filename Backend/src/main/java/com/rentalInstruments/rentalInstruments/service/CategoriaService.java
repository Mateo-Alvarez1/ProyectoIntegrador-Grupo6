package com.rentalInstruments.rentalInstruments.service;

import com.rentalInstruments.rentalInstruments.Repository.CategoriaRepository;
import com.rentalInstruments.rentalInstruments.Repository.Entities.Categoria;
import com.rentalInstruments.rentalInstruments.Repository.Entities.Instrumento;
import com.rentalInstruments.rentalInstruments.Repository.InstrumentoRepository;
import com.rentalInstruments.rentalInstruments.exceptions.InvalidDataEntry;
import com.rentalInstruments.rentalInstruments.exceptions.ObjectAlreadyExists;
import com.rentalInstruments.rentalInstruments.exceptions.ResourceNotFoundException;
import com.rentalInstruments.rentalInstruments.model.CategoriaDto;
import com.rentalInstruments.rentalInstruments.model.InstrumentoDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@Slf4j
public class CategoriaService implements ICategoriaService{


    @Autowired
    private CategoriaRepository categoriaRepository;
    @Autowired
    private InstrumentoRepository instrumentoRepository;



    @Override
    public String eliminarCategoria(String nombre , Long id) throws InvalidDataEntry {

        Optional<Categoria> categoriaOptional = categoriaRepository.findByNombre(nombre);

        if (categoriaOptional.isEmpty()) {
            log.error("No se encontro una categoria con el nombre: " + nombre);
            throw new InvalidDataEntry("Se intento buscar una categoria que no se encuentra en la base de datos");
        }

        List<Instrumento> instrumentos= instrumentoRepository.findByCategoria(nombre);

        if (instrumentos.isEmpty()) {
            categoriaRepository.deleteByNombre(nombre);
            log.info("Categoria eliminada satisfactoriamente");
            return "Categoria eliminada satisfactoriamente";
        }
        for (Instrumento instrumento:instrumentos) {
            instrumentoRepository.deleteById(instrumento.getId());
            log.info("Instrumento con id: "+ instrumento.getId() + " eliminado satisfactoriamente");
        }
        Categoria categoria= categoriaOptional.get();

        Set<Instrumento> instrumentosVacios= new HashSet<>();

        categoria.setInstrumentos(instrumentosVacios);
        categoriaRepository.save(categoria);
        categoriaRepository.deleteById(categoria.getId());
        log.info("Categoria eliminada satisfactoriamente");
        return "Categoria eliminada satisfactoriamente";

    }

    @Override
    public String crearCategoria(CategoriaDto categoriaDto) throws ObjectAlreadyExists {

        Optional<Categoria> categoriaOptional = categoriaRepository.findByNombre(categoriaDto.getNombre());
        if (categoriaOptional.isPresent()){
            log.error("Se intento ingresar una categoria con un nombre ya persistido: " + categoriaDto.getNombre());
            throw new ObjectAlreadyExists("La categoria con nombre " + categoriaDto.getNombre() + " ya se encuentra registrado");
        }
        Categoria categoria = new Categoria();
        categoria.setNombre(categoriaDto.getNombre());
        categoria.setIcono(categoriaDto.getIcono());
        log.info("Categoria persistida satisfactoriamente");
        categoriaRepository.save(categoria);
        return "Categoria persistida satisfactoriamente";
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

    @Override
    public List<Categoria> listarCategorias() throws ResourceNotFoundException {
       List<Categoria> categorias = categoriaRepository.findAll();
       if (categorias.isEmpty()){
           log.error("La lista de categorias esta vacia");
           throw new ResourceNotFoundException("La lista de categorias esta vacia");
       }
       log.info("Categorias listadas correctamente");
       return categorias;
    }
}
