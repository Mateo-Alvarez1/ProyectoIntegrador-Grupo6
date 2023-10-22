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
public class Marca {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String nombre;

    @ManyToMany(mappedBy = "marcas")
    private Set<Nombre> nombres = new HashSet<>();

    public Marca() {

    }
    public Marca(String nombre) {
        this.nombre = nombre;
    }


}




