package com.rentalInstruments.rentalInstruments.controller;

import com.rentalInstruments.rentalInstruments.Repository.Entities.Instrumento;
import com.rentalInstruments.rentalInstruments.exceptions.ObjectAlreadyExists;
import com.rentalInstruments.rentalInstruments.exceptions.ResourceNotFoundException;
import com.rentalInstruments.rentalInstruments.model.InstrumentoDto;
import com.rentalInstruments.rentalInstruments.service.InstrumentoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/instrumentos")
@RequiredArgsConstructor
public class InstrumentoController {


    private final InstrumentoService instrumentoService;
//    private final ImagenService imagenService;

    @PostMapping
    public ResponseEntity<Instrumento> agregarInstrumento(@RequestBody InstrumentoDto instrumentoDto) throws ObjectAlreadyExists {
        return ResponseEntity.ok(instrumentoService.agregarInstrumento(instrumentoDto));
    }


    @GetMapping("/{id}")
    public ResponseEntity<?> buscarInstrumento(@PathVariable Long id) {
        try {
            Instrumento instrumento = instrumentoService.buscar(id);
            return ResponseEntity.ok(instrumento);
        } catch (ResourceNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Instrumento no encontrado con ID: " + id);
        }
    }


    @GetMapping
    public ResponseEntity<?> buscarTodos() {
        try {
            List<Instrumento> instrumentoList = instrumentoService.buscarTodos();
            return ResponseEntity.ok(instrumentoList);
        } catch (ResourceNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No existen instrumentos en la base de datos");
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarInstrumento(@PathVariable Long id) {
        try {
            instrumentoService.eliminar(id);

            String mensaje = "Instrumento con ID: " + id + " eliminado.";
            return ResponseEntity.ok(mensaje);
        } catch (ResourceNotFoundException ex) {
            // Manejar la excepción si el instrumento no se encuentra en la base de datos
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Instrumento no encontrado con ID: " + id);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> modificarInstrumento(@PathVariable Long id, @RequestBody Instrumento nuevoInstrumento) {
        try {
            Instrumento instrumentoModificado = instrumentoService.modificar(id, nuevoInstrumento);

            return ResponseEntity.ok(instrumentoModificado); // Devolver el instrumento modificado en la respuesta
        } catch (ResourceNotFoundException ex) {
            // Manejar la excepción si el instrumento no se encuentra en la base de datos
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Instrumento no encontrado con ID: " + id);
        }
    }


    @GetMapping("/stock/{id}")
    public ResponseEntity<?> obtenerInstrumento(@PathVariable Long id) throws ResourceNotFoundException {
        instrumentoService.agregarStock(id);
        return ResponseEntity.ok("Instrumento con id : " + id + "encontrado satisfactoriamente");
    }
}


    /*@PutMapping("/editar-categoria")
    public ResponseEntity<String> CambiarCategoria(@PathVariable  Long instrumentoId , @PathVariable  Long nuevaCategoriaId) throws ResourceNotFoundException {
        instrumentoService.editarCategoria(instrumentoDto,  InstrumentoDto);
        return ResponseEntity.ok("Has cambiado la categoría exitosamente");

    }*-/

//    @GetMapping
//    public ResponseEntity<List<Imagen>> listarImagenes(){
//        return ResponseEntity.ok(imagenService.listarImagenes());
//    }
//
//    @PostMapping("/{instrumentoId}") // /api/v1/imagenes/1
//    public ResponseEntity<Imagen> agregarImagen(@RequestBody ImagenDto imagenDto, @RequestParam Long instrumentoId) throws BadRequestException {
//        return ResponseEntity.ok(imagenService.agregarImagen(imagenDto, instrumentoId));
//    }


}
     */
