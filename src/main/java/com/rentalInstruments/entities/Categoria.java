package com.rentalInstruments.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;

@Entity
@Table(name = "categorias")
@Getter
@Setter
public class Categoria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public enum CategoriaInstrumentos {
        GUITARRA("Guitarra"),
        BAJO("Bajo"),
        BATERIA("Batería"),
        PIANO("Piano");

        private String nombre;

        CategoriaInstrumentos(String nombre) {
            this.nombre = nombre;
        }

        public String getNombre() {
            return nombre;
        }
    }
}


