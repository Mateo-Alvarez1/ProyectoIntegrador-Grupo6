package com.rentalInstruments.rentalInstruments.Repository.Entities;

import com.rentalInstruments.rentalInstruments.model.InstrumentoDto;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;


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
    //@Column(nullable = false)
    //private Boolean disponibilidad;

    @ManyToOne
    @JoinColumn(name = "instrumento_id" , referencedColumnName = "id")
    private InstrumentoDto instrumentoDto;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;
}
