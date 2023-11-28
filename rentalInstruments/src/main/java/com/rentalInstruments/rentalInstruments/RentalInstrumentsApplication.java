package com.rentalInstruments.rentalInstruments;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "RentalInstrumentsApplication")
public class RentalInstrumentsApplication {

	public static void main(String[] args) {
		SpringApplication.run(RentalInstrumentsApplication.class, args);
	}

}
