package com.rentalInstruments.rentalInstruments.controller;

import com.rentalInstruments.rentalInstruments.Repository.Entities.Categoria;
import com.rentalInstruments.rentalInstruments.Repository.Entities.Instrumento;
import com.rentalInstruments.rentalInstruments.exceptions.ObjectAlreadyExists;
import com.rentalInstruments.rentalInstruments.exceptions.ResourceNotFoundException;
import com.rentalInstruments.rentalInstruments.model.InstrumentoDto;
import com.rentalInstruments.rentalInstruments.service.InstrumentoService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/instrumentos")
@CrossOrigin
public class InstrumentoController {


    @Autowired
    private InstrumentoService instrumentoService;

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
    public ResponseEntity<?> buscarTodos(){
        try{
            List<Instrumento> instrumentoList= instrumentoService.buscarTodos();
            return  ResponseEntity.ok(instrumentoList);
        }
        catch (ResourceNotFoundException ex){
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
    public ResponseEntity<?> modificarInstrumento(@PathVariable Long id, @RequestBody InstrumentoDto instrumentoDto) throws ResourceNotFoundException, ObjectAlreadyExists {
        return  ResponseEntity.ok( instrumentoService.modificar(id , instrumentoDto));
    }


    @PostMapping("/stock/{id}")
    public ResponseEntity<?> agregarStock(@PathVariable Long id) throws ResourceNotFoundException {
        instrumentoService.agregarStock(id);
        return ResponseEntity.ok("Instrumento con id: " + id + " encontrado satisfactoriamente");
    }







}
