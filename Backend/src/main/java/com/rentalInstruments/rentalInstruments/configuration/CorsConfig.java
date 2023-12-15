package com.rentalInstruments.rentalInstruments.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Arrays;

@Configuration
    public class CorsConfig implements WebMvcConfigurer {

//        @Override
//        public void addCorsMappings(CorsRegistry registry) {
//            registry.addMapping("/api/v1/**")
//                    .allowedOrigins("http://3.81.102.46:8080")
//                    .allowedOrigins("http://pitchpleasefront.s3-website-us-east-1.amazonaws.com")
//                    .allowedMethods("GET", "POST", "PUT", "DELETE")
//                    .allowCredentials(true);
//        }

        @Bean
        CorsConfigurationSource corsConfigurationSource(){
            CorsConfiguration configuration = new CorsConfiguration();
            configuration.setAllowedOrigins(Arrays.asList("*"));
            configuration.setAllowedMethods(Arrays.asList("*"));
            configuration.setAllowedHeaders(Arrays.asList("*"));
            UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
            source.registerCorsConfiguration("/**" , configuration);
            return source;
        }

    }


