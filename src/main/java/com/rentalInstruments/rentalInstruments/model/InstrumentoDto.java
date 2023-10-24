package com.rentalInstruments.rentalInstruments.model;

import com.rentalInstruments.rentalInstruments.Repository.Entities.Marca;
import com.rentalInstruments.rentalInstruments.Repository.Entities.Modelo;
import lombok.*;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InstrumentoDto {
    private String nombre;
    private Double precio;
    private Integer stock;
    private Marca marca;
    private Modelo modelo;

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

    public Marca getMarca() {
        return marca;
    }

    public void setMarca(Marca marca) {
        this.marca = marca;
    }

    public Modelo getModelo() {
        return modelo;
    }

    public void setModelo(Modelo modelo) {
        this.modelo = modelo;
    }
}
