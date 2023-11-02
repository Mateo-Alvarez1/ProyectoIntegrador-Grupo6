package com.rentalInstruments.rentalInstruments.Repository.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Instrumento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre;

    @Column(nullable = false)
    private Double precio;

    @Column(nullable = false)
    private String color;

    @Column(nullable = false)
    private Integer stock;

    @ManyToOne
    @JoinColumn(name = "modelo_id" )
    private Modelo modelo;

    @ManyToOne
    @JoinColumn(name = "marca_id" )
    private Marca marca;

//    @OneToMany (mappedBy = "instrumento", cascade = CascadeType.ALL)
//    private List<Imagen> imagen;

    @ManyToOne
    @JoinColumn(name = "categoria_id")
    private Categoria categoria;

    @OneToMany(mappedBy = "instrumento")
    @JsonIgnore
    private Set<Reserva> reservas = new HashSet<>();


}
