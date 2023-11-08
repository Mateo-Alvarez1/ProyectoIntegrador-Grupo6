package com.rentalInstruments.rentalInstruments.Repository.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Marca {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String nombre;
<<<<<<< HEAD

=======
>>>>>>> 4f50c7c389b03ad5af2caf12b3d5cc59d9117616
    @OneToMany(cascade = CascadeType.ALL ,  mappedBy = "marca")
    @JsonIgnore
    private Set<Instrumento> instrumentos = new HashSet<>();


}
