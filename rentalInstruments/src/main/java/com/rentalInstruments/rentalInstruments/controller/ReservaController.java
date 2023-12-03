package com.rentalInstruments.rentalInstruments.controller;

import com.rentalInstruments.rentalInstruments.Repository.Entities.Reserva;
import com.rentalInstruments.rentalInstruments.exceptions.ResourceNotFoundException;
import com.rentalInstruments.rentalInstruments.model.ReservaDto;
import com.rentalInstruments.rentalInstruments.service.ReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/reservas")
@CrossOrigin
public class ReservaController {

    @Autowired
    private ReservaService reservaService;

    @GetMapping("/instrumento/{id}")
    public ResponseEntity<?> buscarPorInstrumento(@PathVariable Long id) {
        try {
            List<Reserva> reservas = reservaService.buscarPorInstrumento(id);
            return ResponseEntity.ok(reservas);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No existen reservas para el instrumento con ID: " + id);
        }
    }

    @GetMapping("/usuario/{email}")
    public ResponseEntity<?> buscarPorUsuario(@PathVariable String email) {
        try {
            List<Reserva> reservas = reservaService.buscarPorUsuario(email);
            return ResponseEntity.ok(reservas);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No existen reservas para el usuario con email: " + email);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscar(@PathVariable Long id) {
        try {
            Reserva reserva = reservaService.buscar(id);
            return ResponseEntity.ok(reserva);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Reserva no encontrada con ID: " + id);
        }
    }


    @GetMapping
    public ResponseEntity<?> buscarTodos() {
        try {
            List<Reserva> reservas = reservaService.buscarTodos();
            return ResponseEntity.ok(reservas);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No existen reservas");
        }
    }


    @PostMapping
    public ResponseEntity<Reserva> agregarReserva(@RequestBody ReservaDto reservaDto) throws ResourceNotFoundException {
        return ResponseEntity.ok(reservaService.agregarReserva(reservaDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id) {
        try {
            reservaService.eliminar(id);
            String mensaje = "reserva con ID: " + id + " eliminada.";
            return ResponseEntity.ok(mensaje);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("reerva con ID: " + id + " no encontrada");
        }
    }

}



