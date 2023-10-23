package com.rentalInstruments.rentalInstruments.model;

import lombok.*;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InstrumentoDto {
    private String nombre;
    private Double precio;
    private Integer stock;

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Double getPrecio() {
        return precio;
    }

    public void setPrecio(Double precio) {
        this.precio = precio;
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }
}
