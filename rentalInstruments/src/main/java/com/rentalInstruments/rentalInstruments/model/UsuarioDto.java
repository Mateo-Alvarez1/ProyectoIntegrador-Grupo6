package com.rentalInstruments.rentalInstruments.model;

import lombok.*;

@Builder
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioDto {
        private Long id;
        private String nombre;
        private String apellido;
        private String email;
        private String password;

}
