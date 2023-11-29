package com.rentalInstruments.rentalInstruments.model;

import jakarta.persistence.Column;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UsuarioDTO {
    private String nombre;
    private String apellido;
    private String email;

}