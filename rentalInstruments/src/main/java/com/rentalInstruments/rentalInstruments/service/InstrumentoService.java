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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class InstrumentoService implements IInstrumentoService {

    @Autowired
    private  InstrumentoRepository instrumentoRepository;
    @Autowired

    private  MarcaRepository marcaRepository;
    @Autowired

    private  ModeloRepository modeloRepository;
    @Autowired
    private CategoriaRepository categoriaRepository;

    @Override
    public Instrumento agregarInstrumento(InstrumentoDto instrumentoDto) throws ObjectAlreadyExists {

        Optional<Instrumento> instrumentoOptional =instrumentoRepository.findByNombre(instrumentoDto.getMarca().getNombre()+ " " + instrumentoDto.getModelo().getNumeroSerie()+ " " + instrumentoDto.getColor());
        if (instrumentoOptional.isPresent()){
            log.error("Se intento ingresar un instrumento con un nombre ya persistido: " + instrumentoDto.getNombre());
            throw new ObjectAlreadyExists("El instrumento con nombre " + instrumentoDto.getMarca().getNombre()+ " " + instrumentoDto.getModelo().getNumeroSerie()+ " " + instrumentoDto.getColor() + " ya se encuentra registrado");
        }

        Instrumento instrumento =  instanciasMCM(instrumentoDto);
        // instrumento.setImagenes(instrumentoDto.getImagenes());
        instrumento.setPrecio(instrumentoDto.getPrecio());
        instrumento.setStock(instrumentoDto.getStock());
        instrumento.setColor(instrumentoDto.getColor());
        instrumento.setNombre(instrumento.getCategoria().getNombre() + " " + instrumento.getMarca().getNombre() + " " + instrumento.getModelo().getNumeroSerie() + " " + instrumentoDto.getColor() );

        log.info("Instrumento persistido satisfactoriamente");
        instrumentoRepository.save(instrumento);
        return instrumento;
    }

    @Override
    public void agregarStock(Long id) throws ResourceNotFoundException {
        Optional<Instrumento> instrumentoOptional = instrumentoRepository.findById(id);
        if (instrumentoOptional.isPresent()) {
            Instrumento instrumento = instrumentoOptional.get();
            instrumento.setStock(instrumento.getStock() + 1);
            instrumentoRepository.save(instrumento);
        }else{
            log.error("No se encuentra el instumento con id: " + id + " en la base de datos");
            throw new ResourceNotFoundException("El instrumento con id: " + id + " no se encuentra en la base de datos");
        }

    }

    @Override
    public Instrumento buscar(Long id)throws ResourceNotFoundException {
        Optional<Instrumento> instrumentoOptional= instrumentoRepository.findById(id);
                if(instrumentoOptional.isPresent()){
                    Instrumento instrumento = instrumentoOptional.get();
                    return instrumento;
                }

                log.error("No existe un instrumento creado con el id: "+id);
        throw new ResourceNotFoundException("El instrumento con id: " + id + " no se encuentra en la base de datos");
    }

    @Override
    public List<Instrumento> buscarTodos() throws ResourceNotFoundException {
        List<Instrumento> instrumentos= instrumentoRepository.findAll();
        if (instrumentos.isEmpty()) {
            log.error("No existen instrumentos en la BD");
            throw new ResourceNotFoundException("No existe ningún instrumento en la BD");
        } else {
            return instrumentos;
        }
    }

    @Override
    public void eliminar(Long id) throws ResourceNotFoundException {
        Optional<Instrumento> instrumentoOptional= instrumentoRepository.findById(id);
        if(instrumentoOptional.isPresent()){
            instrumentoRepository.deleteById(id);
        }
        else{
            log.error("No existe instrumento con el id: "+id);
            throw new ResourceNotFoundException("No existe el instrumento a borrar");
        }

    }

    @Override
    public Instrumento modificar(Long id, InstrumentoDto instrumentoDto) throws ResourceNotFoundException, ObjectAlreadyExists {

        Optional<Instrumento> instrumentoOptional = instrumentoRepository.findById(id);

        if (!instrumentoOptional.isPresent()) {
            log.error("El instrumento no se encontró en la base de datos");
            throw new ResourceNotFoundException("Instrumento no encontrado con ID: " + id);
        }

        Instrumento instrumento = instrumentoOptional.get();

        instrumento.setColor(instrumentoDto.getColor());
        instrumento.setPrecio(instrumentoDto.getPrecio());
        instrumento.setStock(instrumentoDto.getStock());

        // Actualizar la relación de Marca
        Marca marca = null;
        Optional<Marca> marcaOptional = marcaRepository.findByNombre(instrumentoDto.getMarca().getNombre());
        if (marcaOptional.isPresent()) {
            marca = marcaOptional.get();
        } else {
            // Si la Marca no existe, se crea una nueva
            marca = new Marca();
            marca.setNombre(instrumentoDto.getMarca().getNombre());
            marca = marcaRepository.save(marca);
        }
        instrumento.setMarca(marca);

        // Actualizar la relación de Modelo
        Modelo modelo = null;
        Optional<Modelo> modeloOptional = modeloRepository.findByNumeroSerie(instrumentoDto.getModelo().getNumeroSerie());
        if (modeloOptional.isPresent()) {
            modelo = modeloOptional.get();
        } else {
            // Si el Modelo no existe, se crea uno nuevo
            modelo = new Modelo();
            modelo.setNumeroSerie(instrumentoDto.getModelo().getNumeroSerie());
            modelo = modeloRepository.save(modelo);
        }
        instrumento.setModelo(modelo);

        // Actualizar la relación de Categoria
        Categoria categoria = null;
        Optional<Categoria> categoriaOptional = categoriaRepository.findByNombre(instrumentoDto.getCategoria().getNombre());
        if (categoriaOptional.isPresent()) {
            categoria = categoriaOptional.get();
        } else {
            // Si la Categoria no existe, se crea una nueva
            categoria = new Categoria();
            categoria.setNombre(instrumentoDto.getCategoria().getNombre());
            categoria = categoriaRepository.save(categoria);
        }
        instrumento.setCategoria(categoria);

        instrumento.setNombre(instrumento.getCategoria().getNombre() + " " + instrumento.getMarca().getNombre() + " " + instrumento.getModelo().getNumeroSerie() + " " + instrumentoDto.getColor() );

        log.info("Instrumento modificado correctamente");
        instrumentoRepository.save(instrumento);
        return instrumento;
    }


    private Instrumento instanciasMCM(InstrumentoDto instrumentoDto){

        Instrumento instrumento = new Instrumento();

        Optional <Marca> marcaOptional= marcaRepository.findByNombre(instrumentoDto.getMarca().getNombre());
        instrumento.setMarca(marcaOptional.orElseGet( () -> {
            Marca marca = new Marca();
            marca.setNombre(instrumentoDto.getMarca().getNombre());
            return marcaRepository.save(marca);
        }));

        Optional <Modelo> modeloOptional= modeloRepository.findByNumeroSerie(instrumentoDto.getModelo().getNumeroSerie());
        instrumento.setModelo(modeloOptional.orElseGet( () -> {
            Modelo modelo = new Modelo();
            modelo.setNumeroSerie(instrumentoDto.getModelo().getNumeroSerie());
            return modeloRepository.save(modelo);
        }));

        Optional <Categoria> categoriaOptional= categoriaRepository.findByNombre(instrumentoDto.getCategoria().getNombre());
        instrumento.setCategoria( categoriaOptional.orElseGet(() -> {
            Categoria categoria = new Categoria();
            categoria.setNombre(instrumentoDto.getCategoria().getNombre());
            return categoriaRepository.save(categoria);
        }));

        return instrumento;

    }
}

