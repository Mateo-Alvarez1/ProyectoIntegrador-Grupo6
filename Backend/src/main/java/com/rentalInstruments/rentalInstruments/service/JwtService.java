package com.rentalInstruments.rentalInstruments.service;


import com.rentalInstruments.rentalInstruments.Repository.Entities.Role;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {
    private static final String SECRET_KEY = "4efd5661a628ab10f6a7ce68a110f031fa1a4b5aa88c2fed180088b878524481" ;
    public String extractUsername(String token) {
        return extractClaim(token , Claims::getSubject);
    }

    public <T> T extractClaim(String token , Function<Claims , T > claimsFunction){
        Claims claims = extractAllClaims(token);
        return claimsFunction.apply(claims);
    }

    public Claims extractAllClaims(String token){
        return Jwts
                .parserBuilder()
                .setSigningKey(getSigninKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public String generateToken(UserDetails userDetails , String nombre, String apellido , Role role){
        return generateToken(new HashMap<>() , userDetails , nombre ,apellido ,role);
    }


    public String generateToken(
            Map<String , Object> extraClaims ,
            UserDetails userDetails ,
            String nombre,
            String apellido ,
            Role role
    ){
        return Jwts
                .builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .claim("nombre" , nombre)
                .claim("apellido" , apellido)
                .claim("role" , role)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 3))
                .signWith(getSigninKey() , SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean isTokenValid(String token , UserDetails userDetails){
        String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    public boolean isTokenExpired(String token){
        return  extractExpiration(token).before(new Date());
    }

    public Date extractExpiration(String token){
        return extractClaim(token , Claims::getExpiration);
    }

    private Key getSigninKey() {
         return Keys.secretKeyFor(SignatureAlgorithm.HS256);
        //byte[] keyBytes = Decoders.BASE64URL.decode(SECRET_KEY);
        //return Keys.hmacShaKeyFor(keyBytes);
    }


}
