package com.rentalInstruments.rentalInstruments.model;

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
    private InstrumentoDto instrumento;
    private UsuarioDto usuario;


}
