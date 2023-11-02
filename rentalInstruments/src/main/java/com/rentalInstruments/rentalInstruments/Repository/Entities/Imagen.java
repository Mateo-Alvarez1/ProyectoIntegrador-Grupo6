//package com.rentalInstruments.rentalInstruments.Repository.Entities;
//
//import com.fasterxml.jackson.annotation.JsonIdentityInfo;
//import com.fasterxml.jackson.annotation.JsonIdentityReference;
//import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
//import com.fasterxml.jackson.annotation.ObjectIdGenerators;
//import jakarta.persistence.*;
//import lombok.*;
//
//@Entity
//@Getter
//@Setter
//@Data
//@NoArgsConstructor
//@AllArgsConstructor
//@Table(name = "imagenes")
////@JsonIdentityInfo(
////        generator = ObjectIdGenerators.PropertyGenerator.class,
////        property = "id",
////        scope = Imagen.class
////)
//@JsonIgnoreProperties(value = "instrumento")
//public class Imagen {
//
//    @Id
//    @GeneratedValue (strategy = GenerationType.IDENTITY)
//    private Long id;
//    private String url;
//
//    @ManyToOne
//    @JoinColumn(name = "instrumento_id", referencedColumnName = "id")
//    @JsonIdentityReference(alwaysAsId = true)
//    private Instrumento instrumento;
//
//}
