package com.rentalInstruments.rentalInstruments.configuration;
import com.rentalInstruments.rentalInstruments.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Configuration
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain)
        throws ServletException, IOException {
           final String authHeader = request.getHeader("Authorization");
           final String jwtToken;
           final String userEmail;
           if (authHeader == null || !authHeader.startsWith("Bearer ") ){
               filterChain.doFilter(request , response);
               return;
           }
           jwtToken = authHeader.substring(7);
           userEmail = jwtService.extractUsername(jwtToken);
           if ( userEmail != null || SecurityContextHolder.getContext().getAuthentication() == null ){
               UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);
               if (jwtService.isTokenValid(jwtToken, userDetails)) {
                   UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                           userDetails ,
                           null ,
                           userDetails.getAuthorities()
                   );
                   authenticationToken.setDetails(
                           new WebAuthenticationDetailsSource().buildDetails(request)
                   );
                   SecurityContextHolder.getContext().setAuthentication(authenticationToken);
               }
           }
           filterChain.doFilter(request , response);
    }
}
