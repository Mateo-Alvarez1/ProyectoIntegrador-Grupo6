package com.rentalInstruments.rentalInstruments.config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;

@Configuration
public class AmazonConfig {
    @Bean
    public S3Client s3() {
        S3Client s3Client = S3Client.builder()
                .region(Region.US_EAST_1)
                .build();
        return s3Client;
    }
}

