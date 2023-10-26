package com.rentalInstruments.rentalInstruments.service;

import com.rentalInstruments.rentalInstruments.Repository.Entities.Instrumento;
import com.rentalInstruments.rentalInstruments.Repository.Entities.Marca;
import com.rentalInstruments.rentalInstruments.Repository.Entities.Modelo;
import com.rentalInstruments.rentalInstruments.Repository.InstrumentoRepository;
import com.rentalInstruments.rentalInstruments.Repository.MarcaRepository;
import com.rentalInstruments.rentalInstruments.Repository.ModeloRepository;
import com.rentalInstruments.rentalInstruments.exceptions.ObjectAlreadyExists;
import com.rentalInstruments.rentalInstruments.model.InstrumentoDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.lang.module.ResolutionException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class InstrumentoService implements InstrumentoInterface {

    private final InstrumentoRepository instrumentoRepository;
    private final MarcaRepository marcaRepository;
    private final ModeloRepository modeloRepository;

    @Override
    public Instrumento agregarInstrumento(InstrumentoDto instrumentoDto) throws ObjectAlreadyExists {

        String nombreMarca = (instrumentoDto.getMarca() != null) ? marcaRepository.findById(instrumentoDto.getMarca().getId()).get().getNombre() : "";
        String numeroSerie = (instrumentoDto.getModelo() != null) ? modeloRepository.findById(instrumentoDto.getModelo().getId()).get().getNumeroSerie() : "";
        String nombreInstrumento = nombreMarca + " " + numeroSerie;

        if ( instrumentoRepository.findByNombre(instrumentoDto.getNombre()).isPresent()){
            log.error("Se intento ingresar un instrumento con un nombre ya persistido: " + instrumentoDto.getNombre());
            throw new ObjectAlreadyExists("El instrumento con nombre " + instrumentoDto.getNombre() + " ya se encuentra registrado");
        }


        Instrumento instrumento = new Instrumento();
        instrumento.setPrecio(instrumentoDto.getPrecio());
        instrumento.setStock(instrumentoDto.getStock());
        instrumento.setMarca(instrumentoDto.getMarca());
        instrumento.setModelo(instrumentoDto.getModelo());
        instrumento.setCategoria(instrumentoDto.getCategoria());
        instrumento.setNombre(nombreInstrumento);

        log.info("Instrumento persistido satisfactoriamente");
        instrumentoRepository.save(instrumento);
        return instrumento;
    }

    @Override
    public void agregarStock(Long id) {
        Optional<Instrumento> instrumentoOptional = instrumentoRepository.findById(id);
        if (instrumentoOptional.isPresent()){
            Instrumento instrumento = instrumentoOptional.get();
            instrumento.setStock(instrumento.getStock() + 1);
            instrumentoRepository.save(instrumento);
        }
        log.error("No se encuentra el instumento con id: " + id + " en la base de datos");
        throw new ResolutionException("El instrumento con id: " + id + " no se encuentra en la base de datos");
    }

}
