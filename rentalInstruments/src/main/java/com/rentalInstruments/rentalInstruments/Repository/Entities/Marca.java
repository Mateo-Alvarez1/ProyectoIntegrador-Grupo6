package com.rentalInstruments.rentalInstruments.Repository.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;

@Entity
@Getter
@Setter
@Data
@Builder
public class Marca {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String nombre;
    @Column(nullable = false)
    private String paisOrigen;

    @OneToMany(mappedBy = "marca")
    @JsonIgnore
    private HashSet<Instrumento> instrumentos;


}
