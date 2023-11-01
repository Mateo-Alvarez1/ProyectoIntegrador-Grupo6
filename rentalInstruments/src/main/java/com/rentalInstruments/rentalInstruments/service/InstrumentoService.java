package com.rentalInstruments.rentalInstruments.service;

import com.rentalInstruments.rentalInstruments.Repository.CategoriaRepository;
import com.rentalInstruments.rentalInstruments.Repository.Entities.Categoria;
import com.rentalInstruments.rentalInstruments.Repository.Entities.Instrumento;
import com.rentalInstruments.rentalInstruments.Repository.Entities.Marca;
import com.rentalInstruments.rentalInstruments.Repository.Entities.Modelo;
import com.rentalInstruments.rentalInstruments.Repository.InstrumentoRepository;
import com.rentalInstruments.rentalInstruments.Repository.MarcaRepository;
import com.rentalInstruments.rentalInstruments.Repository.ModeloRepository;
import com.rentalInstruments.rentalInstruments.exceptions.ObjectAlreadyExists;
import com.rentalInstruments.rentalInstruments.exceptions.ResourceNotFoundException;
import com.rentalInstruments.rentalInstruments.model.InstrumentoDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class InstrumentoService implements InstrumentoInterface {

    private final InstrumentoRepository instrumentoRepository;
    private final MarcaRepository marcaRepository;
    private final ModeloRepository modeloRepository;
    private final CategoriaRepository categoriaRepository;

    @Override
    public Instrumento agregarInstrumento(InstrumentoDto instrumentoDto) throws ObjectAlreadyExists {

        if ( instrumentoRepository.findByNombre(instrumentoDto.getNombre()).isPresent()){
            log.error("Se intento ingresar un instrumento con un nombre ya persistido: " + instrumentoDto.getNombre());
            throw new ObjectAlreadyExists("El instrumento con nombre " + instrumentoDto.getNombre() + " ya se encuentra registrado");
        }

        Marca marca = new Marca();
        marca.setNombre(instrumentoDto.getMarca().getNombre());
        marcaRepository.save(marca);

        Modelo modelo = new Modelo();
        modelo.setNumeroSerie(instrumentoDto.getModelo().getNumeroSerie());
        modeloRepository.save(modelo);

        Categoria categoria = new Categoria();
        categoria.setNombre(instrumentoDto.getCategoria().getNombre());
        categoriaRepository.save(categoria);

        Instrumento instrumento = new Instrumento();
        instrumento.setPrecio(instrumentoDto.getPrecio());
        instrumento.setStock(instrumentoDto.getStock());
        instrumento.setMarca(marca);
        instrumento.setModelo(modelo);
        instrumento.setCategoria(categoria);
        instrumento.setNombre(marca.getNombre() + " " + modelo.getNumeroSerie());

        log.info("Instrumento persistido satisfactoriamente");
        instrumentoRepository.save(instrumento);
        return instrumento;
    }

    @Override
    public void agregarStock(Long id) throws ResourceNotFoundException {
        Optional<Instrumento> instrumentoOptional = instrumentoRepository.findById(id);
        if (instrumentoOptional.isPresent()){
            Instrumento instrumento = instrumentoOptional.get();
            instrumento.setStock(instrumento.getStock() + 1);
            instrumentoRepository.save(instrumento);
        }
        log.error("No se encuentra el instumento con id: " + id + " en la base de datos");
        throw new ResourceNotFoundException("El instrumento con id: " + id + " no se encuentra en la base de datos");
    }
    public void editarCategoria(Long instrumentoId, Long nuevaCategoriaId) throws ResourceNotFoundException {
        Optional<Instrumento> instrumentoBuscado = instrumentoRepository.findById(instrumentoId);

        if (instrumentoBuscado.isPresent()) {
            Instrumento instrumento = instrumentoBuscado.get();
            Optional<Categoria> nuevaCategoriaOptional = categoriaRepository.findById(nuevaCategoriaId);

            if (nuevaCategoriaOptional.isPresent()) {
                Categoria nuevaCategoria = nuevaCategoriaOptional.get();
                instrumento.setCategoria(nuevaCategoria);
                instrumentoRepository.save(instrumento);
            } else {
            log.error("No se encuentra el instrumento con id: " + instrumentoId + " en la base de datos");
            throw new ResourceNotFoundException("No se encontró el instrumento con ID: " + instrumentoId);
        }
            } else {
                log.error("No se encuentra la categoria con id: " + nuevaCategoriaId + " en la base de datos");
                throw new ResourceNotFoundException("No se encontró la  categoría con ID: " + nuevaCategoriaId);
            }

    }
}
