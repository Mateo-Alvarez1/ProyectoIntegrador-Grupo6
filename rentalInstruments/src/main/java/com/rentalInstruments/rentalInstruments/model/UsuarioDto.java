package com.rentalInstruments.rentalInstruments.model;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UsuarioDto {
    private String nombre;
    private String apellido;
    private String email;

}