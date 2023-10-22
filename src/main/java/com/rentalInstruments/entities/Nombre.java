package com.rentalInstruments.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "nombres")
@Getter
@Setter
public class Nombre {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String nombre;

    @ManyToMany
    @JoinTable(
            name = "nombres", // Nombre de la tabla intermedia
            joinColumns = @JoinColumn(name = "nombre_id"),
            inverseJoinColumns = @JoinColumn(name = "marca_id")
    )
    private Set<Marca> marcas = new HashSet<>();

    @ManyToMany
    @JoinTable(
            name = "nombres", // Nombre de la tabla intermedia
            joinColumns = @JoinColumn(name = "nombre_id"),
            inverseJoinColumns = @JoinColumn(name = "modelo_id")
    )
    private Set<Modelo> modelos = new HashSet();

    public Nombre() {

    }

    public Nombre(String nombre) {
        this.nombre = nombre;
    }

    public void construirNombre(String marca, String modelo) {
        this.nombre = marca + " " + modelo;
    }
}

