package com.rentalInstruments.rentalInstruments.model;

import com.rentalInstruments.rentalInstruments.Repository.Entities.Categoria;
//import com.rentalInstruments.rentalInstruments.Repository.Entities.Imagen;
import com.rentalInstruments.rentalInstruments.Repository.Entities.Marca;
import com.rentalInstruments.rentalInstruments.Repository.Entities.Modelo;
import lombok.*;

import java.util.ArrayList;
import java.util.List;


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
