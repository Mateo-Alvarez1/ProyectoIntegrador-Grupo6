package com.rentalInstruments.rentalInstruments.Repository.Entities;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Reserva {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private LocalDate fechaInicio ;
    @Column(nullable = false)
    private LocalDate fechaDevolucion ;
    @Column(nullable = false)
    private Boolean disponibilidad;

    @ManyToOne
    @JoinColumn(name = "instrumento_id" , referencedColumnName = "id")
    private Instrumento instrumento;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;
}
