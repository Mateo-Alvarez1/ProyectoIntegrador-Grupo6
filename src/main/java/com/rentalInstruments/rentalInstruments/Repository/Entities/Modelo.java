package com.rentalInstruments.rentalInstruments.Repository.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;

@Entity
@Getter
@Setter
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Modelo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private Integer numeroSerie;
    @OneToMany(mappedBy = "modelo")
    @JsonIgnore
    private HashSet<Instrumento> instrumentos;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public HashSet<Instrumento> getInstrumentos() {
        return instrumentos;
    }

    public void setInstrumentos(HashSet<Instrumento> instrumentos) {
        this.instrumentos = instrumentos;
    }

    public Integer getNumeroSerie() {
        return numeroSerie;
    }

    public void setNumeroSerie(Integer numeroSerie) {
        this.numeroSerie = numeroSerie;
    }
}

