package com.rentalInstruments.entities;


import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;

@Entity
@Table(name = "instrumentos")
@Getter
@Setter
public class Instrumento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, unique = true)
    @OneToOne (fetch = FetchType.LAZY)
    @JoinColumn (name = "nombre_id" , referencedColumnName = "id_nombre")
    private Nombre nombre;
    @Column
    private double precio;
    @Column
    @OneToMany(mappedBy = "instrumento", fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<Reserva> reserva= new HashSet<>();
    @Column
    private int stock ;


}
