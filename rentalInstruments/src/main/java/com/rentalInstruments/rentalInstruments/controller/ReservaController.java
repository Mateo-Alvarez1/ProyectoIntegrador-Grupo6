package com.rentalInstruments.rentalInstruments.controller;

import com.rentalInstruments.rentalInstruments.Repository.Entities.Reserva;
import com.rentalInstruments.rentalInstruments.exceptions.ReservaNoDisponibleException;
import com.rentalInstruments.rentalInstruments.exceptions.ResourceNotFoundException;
import com.rentalInstruments.rentalInstruments.service.ReservaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/reserva")
@RequiredArgsConstructor
@CrossOrigin
public class ReservaController {
    private final ReservaService reservaService;

    @PostMapping
    ResponseEntity<Reserva> generarReserva(@RequestBody Reserva reserva)
            throws ResourceNotFoundException, ReservaNoDisponibleException {
        // Llamar al servicio con la reserva recibida en el cuerpo de la solicitud
        Reserva nuevaReserva = reservaService.generarReserva(reserva);
        return ResponseEntity.ok(nuevaReserva);
    }
    }





