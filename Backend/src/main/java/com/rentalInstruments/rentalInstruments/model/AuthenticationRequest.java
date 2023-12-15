package com.rentalInstruments.rentalInstruments.model;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Builder
@Data
@Getter
@Setter
public class AuthenticationRequest {

    private String email;
    private String password;

}
