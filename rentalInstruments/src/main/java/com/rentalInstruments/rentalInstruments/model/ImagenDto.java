package com.rentalInstruments.rentalInstruments.model;

import com.rentalInstruments.rentalInstruments.Repository.Entities.Instrumento;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ImagenDto {
    private String url;
    private Instrumento instrumento;

}
