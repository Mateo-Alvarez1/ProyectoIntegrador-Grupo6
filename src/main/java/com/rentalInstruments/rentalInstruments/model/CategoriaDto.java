package com.rentalInstruments.rentalInstruments.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.rentalInstruments.rentalInstruments.Repository.Entities.Instrumento;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CategoriaDto {



    private Long id;


    private String nombre;


    private Set<Instrumento> instrumentos = new HashSet<>();
}
