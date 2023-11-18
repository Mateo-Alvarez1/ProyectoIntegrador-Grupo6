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

import java.util.List;
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

        Optional<Instrumento> i=instrumentoRepository.findByNombre(instrumentoDto.getMarca().getNombre()+ " " + instrumentoDto.getModelo().getNumeroSerie()+ " " + instrumentoDto.getColor());
        if (i.isPresent()){

            log.error("Se intento ingresar un instrumento con un nombre ya persistido: " + instrumentoDto.getNombre());
            throw new ObjectAlreadyExists("El instrumento con nombre " + instrumentoDto.getMarca().getNombre()+ " " + instrumentoDto.getModelo().getNumeroSerie()+ " " + instrumentoDto.getColor() + " ya se encuentra registrado");
        }

        Marca marca = new Marca();
        marca.setNombre(instrumentoDto.getMarca().getNombre());
        marca.setPaisOrigen(instrumentoDto.getMarca().getPaisOrigen());
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
        instrumento.setColor(instrumentoDto.getColor());
        instrumento.setNombre(marca.getNombre() + " " + modelo.getNumeroSerie() + " " + instrumentoDto.getColor() );

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
        }
        log.error("No se encuentra el instumento con id: " + id + " en la base de datos");
        throw new ResourceNotFoundException("El instrumento con id: " + id + " no se encuentra en la base de datos");
    }


    /* public Instrumento editarCategoria(Long instrumentoId, Long nuevaCategoriaId) throws ResourceNotFoundException {
         Optional<Instrumento> instrumentoBuscado = instrumentoRepository.findById(instrumentoId);

         if (instrumentoBuscado.isPresent()) {
             Instrumento instrumento = instrumentoBuscado.get();
             instrumento.setCategoria(instrumento.getCategoria());
             instrumentoRepository.save(instrumento);
             return instrumento;
         } else {
             log.error("No se encuentra el instrumento con id: " + instrumentoId + " en la base de datos");
             throw new ResourceNotFoundException("No se encontró el instrumento con ID: " + instrumentoId);
         }
     }*/




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
    public Instrumento modificar(Long id, Instrumento nuevoInstrumento) throws ResourceNotFoundException {
        Optional<Instrumento> instrumentoOptional = instrumentoRepository.findById(id);
        if (instrumentoOptional.isPresent()) {
            Instrumento instrumentoExistente = instrumentoOptional.get();

            instrumentoExistente.setNombre(nuevoInstrumento.getMarca()+ " "+ nuevoInstrumento.getModelo() + " " + nuevoInstrumento.getColor());
            instrumentoExistente.setStock(nuevoInstrumento.getStock());
            instrumentoExistente.setPrecio(nuevoInstrumento.getPrecio());
            instrumentoExistente.setCategoria(nuevoInstrumento.getCategoria());
            instrumentoExistente.setModelo(nuevoInstrumento.getModelo());
            instrumentoExistente.setMarca(nuevoInstrumento.getMarca());
            instrumentoExistente.setColor(nuevoInstrumento.getColor());


            Instrumento instrumentoModificado = instrumentoRepository.save(instrumentoExistente);

            return instrumentoModificado;
        } else {
            throw new ResourceNotFoundException("Instrumento no encontrado con ID: " + id);
        }
    }


    // DEVUELVA UN INSTRUMENTO
    // RECIBA
    public Instrumento editarCategoria(InstrumentoDto instrumentoDto) throws ResourceNotFoundException {
        Optional<Instrumento> instrumentoBuscado = instrumentoRepository.findById(instrumentoDto.getId());

        if (!instrumentoBuscado.isPresent()) {
            log.error("El instrumento con id: " +instrumentoDto.getId() + " no se encuentra en la base de datos");
            throw new ResourceNotFoundException("No existe un instrumento con ese id");
        }
        Instrumento instrumento = instrumentoBuscado.get();
        instrumento.setCategoria(instrumentoDto.getCategoria());

        log.info("Categoria actualizada correctamente");
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

