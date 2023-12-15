package com.rentalInstruments.rentalInstruments.model;

import com.rentalInstruments.rentalInstruments.Repository.Entities.Instrumento;
import com.rentalInstruments.rentalInstruments.Repository.Entities.Usuario;
import lombok.*;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ReservaDto {

    private LocalDate fechaInicio ;
    private LocalDate fechaDevolucion ;
    private Instrumento instrumento;
    private Usuario usuario;

}
