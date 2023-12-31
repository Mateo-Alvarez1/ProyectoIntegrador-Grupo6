package com.rentalInstruments.rentalInstruments.configuration;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private  AuthenticationProvider authenticationProvider;
    @Autowired
    private JwtFilter jwtFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors()
                .and()
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests( auth -> {
                    auth.requestMatchers("api/v1/instrumentos/**").permitAll();
                    auth.requestMatchers("api/v1/categoria/**").permitAll();
                    auth.requestMatchers("api/v1/reservas/**").permitAll();
                    auth.requestMatchers("api/v1/auth/**").permitAll();
                    auth.requestMatchers("/file/**").permitAll();
                    auth.requestMatchers("api/v1/usuarios/**").permitAll();
                    auth.requestMatchers("/v2/api-docs").permitAll();
                    auth.requestMatchers("/swagger-resources").permitAll();
                    auth.requestMatchers("/swagger-resources/**").permitAll();
                    auth.requestMatchers("/configuration/ui").permitAll();
                    auth.requestMatchers("/configuration/security").permitAll();
                    auth.requestMatchers("/swagger-ui.html").permitAll();
                    auth.requestMatchers("/webjars/**").permitAll();
                    auth.requestMatchers("/v3/api-docs/**").permitAll();
                    auth.requestMatchers("/v3/api-docs.yaml").permitAll();
                    auth.requestMatchers("/swagger-ui/**").permitAll();
                    auth.requestMatchers("/webjars/springfox-swagger-ui/**").permitAll();
                    auth.anyRequest().authenticated();
                }).sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtFilter , UsernamePasswordAuthenticationFilter.class)
                .logout( logout -> {
                    logout.logoutUrl("api/v1/auth/logout");
                    logout.logoutSuccessUrl("/");
                });

        return http.build();
    }

}
