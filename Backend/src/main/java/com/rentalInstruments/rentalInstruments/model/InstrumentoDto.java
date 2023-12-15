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



@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class InstrumentoDto {

    private Long id;
    private String nombre;
    private String color;
    private Double precio;
    private Integer stock;
    private Marca marca;
    private Modelo modelo;
    private Categoria categoria;
    private List<String> imagenes= new ArrayList<>();


}
