package com.rentalInstruments.rentalInstruments.exceptions;

import com.amazonaws.services.connect.model.UserNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler({ ObjectAlreadyExists.class })
    private ResponseEntity<String> objectAlreadyExists(ObjectAlreadyExists OAE){
        return ResponseEntity.status(HttpStatus.CONFLICT).body(OAE.getMessage());
    }

    @ExceptionHandler({ResourceNotFoundException.class})
    private ResponseEntity<String> resourceNotFound(ResourceNotFoundException RNFE){
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(RNFE.getMessage());
    }

    @ExceptionHandler({InvalidDataEntry.class})
    private ResponseEntity<String> invalidDataEntry(InvalidDataEntry IDE){
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(IDE.getMessage());
    }

    @ExceptionHandler({BadRequestException.class})
    private ResponseEntity<String> badRequest(BadRequestException BRE){
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(BRE.getMessage());
    }
    @ExceptionHandler({UserNotFoundException.class})
    private ResponseEntity<String> userNotFoundException(UserNotFoundException UNFE){
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(UNFE.getMessage());
    }
    @ExceptionHandler({ReservaNoDisponibleException.class})
    private ResponseEntity<String> ReservaNoDisponibleException(ReservaNoDisponibleException RNDE){
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(RNDE.getMessage());
    }
}
