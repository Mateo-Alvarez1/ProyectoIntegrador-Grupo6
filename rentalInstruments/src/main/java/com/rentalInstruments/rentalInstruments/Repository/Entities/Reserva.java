package com.rentalInstruments.rentalInstruments.Repository.Entities;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Reserva {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private LocalDateTime fechaInicio ;
    @Column(nullable = false)
    private LocalDateTime fechaDevolucion ;
    @Column(nullable = false)
    private Boolean disponibilidad;

    @ManyToOne
    @JoinColumn(name = "instrumento_id" , referencedColumnName = "id")
    private Instrumento instrumento;
//  COMENTADO MOMENTANEAMENTE POR LA MISMA RAZON QUE LA DEPENDENCIA DEL SECURITY
//    @ManyToOne
//    @JoinColumn(name = "usuario_id" , referencedColumnName = "id")
//    private Usuario usuario;
}
