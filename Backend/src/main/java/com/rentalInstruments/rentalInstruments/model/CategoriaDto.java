package com.rentalInstruments.rentalInstruments.model;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CategoriaDto {
    private String nombre;
    private String icono;
}
