package com.rentalInstruments.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;

import java.util.HashSet;
import java.util.Set;
@Entity
@Getter
@Setter
public class Modelo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String nombre;

    @ManyToMany(mappedBy = "modelos")
    private Set<Nombre> nombres = new HashSet<>();

    public Modelo() {

    }
    public Modelo(String nombre) {
        this.nombre = nombre;
    }
}




