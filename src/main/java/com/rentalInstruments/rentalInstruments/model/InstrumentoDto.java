package com.rentalInstruments.rentalInstruments.model;

import com.rentalInstruments.rentalInstruments.Repository.Entities.Categoria;
import com.rentalInstruments.rentalInstruments.Repository.Entities.Marca;
import com.rentalInstruments.rentalInstruments.Repository.Entities.Modelo;
import lombok.*;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class InstrumentoDto {
    private String nombre;
    private Double precio;
    private Integer stock;
    private Marca marca;
    private Modelo modelo;
    private Categoria categoria;

    public InstrumentoDto(Double precio, Integer stock, Marca marca, Modelo modelo, Categoria categoria) {
        this.precio = precio;
        this.stock = stock;
        this.marca = marca;
        this.modelo = modelo;
        this.categoria = categoria;
    }
}



