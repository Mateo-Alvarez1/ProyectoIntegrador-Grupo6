package com.rentalInstruments.rentalInstruments.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.rentalInstruments.rentalInstruments.Repository.Entities.Categoria;
import com.rentalInstruments.rentalInstruments.Repository.Entities.Marca;
import com.rentalInstruments.rentalInstruments.Repository.Entities.Modelo;
import com.rentalInstruments.rentalInstruments.Repository.Entities.Reserva;
import jakarta.persistence.*;
import lombok.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@Getter
@Setter
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InstrumentoDto {

    private Long id;
    private String nombre;
    private Double precio;
    private String color;
    private Integer stock;
    private Modelo modelo;
    private Marca marca;
    private Categoria categoria;
    private List<String> imagenes = new ArrayList<>();

}
