package com.rentalInstruments.rentalInstruments.Repository.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
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

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "modelo_id" )
    private Modelo modelo;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "marca_id" )
    private Marca marca;


    @ManyToOne(cascade = CascadeType.ALL)

//   private List<Imagen> imagen;


    @JoinColumn(name = "categoria_id")
    private Categoria categoria;

    @OneToMany(mappedBy = "instrumento")
    @JsonIgnore
    private Set<Reserva> reservas = new HashSet<>();

    private List<String> imagenes = new ArrayList<>();

    public void setImagenes(List<String> imagenes) {
    }
}
