package com.no_country.project_ninja.api.infra.security.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.no_country.project_ninja.api.domain.user.UserEntity;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.time.Instant;

@Component
@Slf4j
public class TokenUtils {
    @Value("${api.security.secret}")
    private String apiSecret;

    public String tokenGeneration(UserEntity userEntity) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(apiSecret);
            return JWT.create()
                    .withIssuer("ninja project")
                    .withSubject(userEntity.getEmail())
                    .withClaim("id", userEntity.getId())
                    .withExpiresAt(dueDateToken())
                    .sign(algorithm);
        } catch (JWTCreationException exception){
            throw new RuntimeException();
        }
    }

    public Boolean validToken(String token) {
        notNullToken(token);

        DecodedJWT verifier = null;
        try {
            Algorithm algorithm = Algorithm.HMAC256(apiSecret); // validando firma
            verifier = JWT.require(algorithm)
                    .withIssuer("ninja project")
                    .build()
                    .verify(token);

        } catch (JWTVerificationException exception) {
            System.out.println(exception.toString());
        }
        assert verifier != null;
        if (verifier.getSubject() == null) {
            throw new RuntimeException("Invalid verified");
        }
        return true;
    }

    public String getUserFromToken(String token){
        notNullToken(token);

        DecodedJWT verifier = null;
        try {
            Algorithm algorithm = Algorithm.HMAC256(apiSecret); // validando firma
            verifier = JWT.require(algorithm)
                    .withIssuer("ninja project")
                    .build()
                    .verify(token);
            verifier.getSubject();
        } catch (JWTVerificationException exception) {
            System.out.println(exception.toString());
        }
        assert verifier != null;
        if (verifier.getSubject() == null) {
            throw new RuntimeException("Invalid verified");
        }

        return verifier.getSubject();
    }


    private Instant dueDateToken() {
        //return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("-05:00"));
        return Instant.now().plus(Duration.ofHours(2));
    }

    private void notNullToken(String token){
        if (token == null) {
            throw new RuntimeException();
        }
    }

}
