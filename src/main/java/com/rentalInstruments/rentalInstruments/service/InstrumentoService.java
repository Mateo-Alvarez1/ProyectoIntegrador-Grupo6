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

@Service
@RequiredArgsConstructor
@Slf4j
public class InstrumentoService implements InstrumentoInterface {

    private final InstrumentoRepository instrumentoRepository;
    private final MarcaRepository marcaRepository;
    private final ModeloRepository modeloRepository;

//PRIMER VERSION COMO PARA PROBAR EL ENDPOINT Y QUE EL PRODUCTO SE GUARDE EN LA BASE DE DATOS
    @Override
    public Instrumento agregarInstrumento(InstrumentoDto instrumentoDto) throws ObjectAlreadyExists {
        String nombreMarca = (instrumentoDto.getMarca() != null) ? instrumentoDto.getMarca().getNombre() : "";
        String numeroSerie = (instrumentoDto.getModelo() != null) ? instrumentoDto.getModelo().getNumeroSerie() : "";
        String nombreInstrumento = nombreMarca + " " + numeroSerie;
        if ( instrumentoRepository.findByNombre(instrumentoDto.getNombre()).isPresent()){
            log.error("Se intento ingresar un instrumento con un nombre ya persistido: " + instrumentoDto.getNombre());
            throw new ObjectAlreadyExists("El instrumento con nombre " + instrumentoDto.getNombre() + " ya se encuentra registrado");
        }
        // Verificar si la Marca ya existe en la base de datos
        Marca marca = instrumentoDto.getMarca();
        if (marca != null && marca.getId() == null) {
            marca = marcaRepository.save(marca);
        }
        Modelo modelo = instrumentoDto.getModelo();
        if (modelo != null && modelo.getId() == null) {
            modelo = modeloRepository.save(modelo);
        }



        Instrumento instrumento = new Instrumento();
        instrumento.setPrecio(instrumentoDto.getPrecio());
        instrumento.setStock(instrumentoDto.getStock());
        instrumento.setMarca(marca);
        instrumento.setModelo(modelo);
        instrumento.setNombre(instrumentoDto.getMarca().getNombre()+ " " + instrumentoDto.getModelo().getNumeroSerie());
        instrumento.setCategoria(instrumentoDto.getCategoria());


        instrumentoRepository.save(instrumento);
        return instrumento;
    }




}




