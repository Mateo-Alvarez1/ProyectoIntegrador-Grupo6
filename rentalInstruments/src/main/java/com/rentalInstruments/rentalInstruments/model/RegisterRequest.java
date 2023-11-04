package com.rentalInstruments.rentalInstruments.model;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;


@Builder
@Data
@Getter
@Setter
public class RegisterRequest {

    private String nombre;
    private String apellido;
    private Integer dni;
    private String email;
    private String password;

}
