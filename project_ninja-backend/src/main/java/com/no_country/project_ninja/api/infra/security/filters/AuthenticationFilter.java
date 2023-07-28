package com.no_country.project_ninja.api.infra.security.filters;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.no_country.project_ninja.api.domain.user.UserEntity;
import com.no_country.project_ninja.api.domain.user.UserRepository;
import com.no_country.project_ninja.api.domain.user.dto.UserAuth;
import com.no_country.project_ninja.api.infra.security.jwt.TokenUtils;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;


public class AuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private final TokenUtils tokenUtils;
    private UserRepository userRepository;
    public AuthenticationFilter(TokenUtils tokenUtils, UserRepository userRepository){
        this.tokenUtils= tokenUtils;
        this.userRepository= userRepository;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        UserAuth userAuth;

        try {
            userAuth= new ObjectMapper().readValue(request.getInputStream(), UserAuth.class);

        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        UsernamePasswordAuthenticationToken authenticationToken= new UsernamePasswordAuthenticationToken(userAuth.getEmail(), userAuth.getPassword());

        return getAuthenticationManager().authenticate(authenticationToken);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {

        User user= (User) authResult.getPrincipal();

        UserEntity userEntity = (UserEntity) userRepository.findByEmail(user.getUsername()).orElseThrow(
                () -> new UsernameNotFoundException("not found user: "+user.getUsername()));

        String token= tokenUtils.tokenGeneration(userEntity);
        response.addHeader("Authorization", token);

        Map<String, Object> httpResponse = new HashMap<>();
        httpResponse.put("token", token);
        httpResponse.put("Message", "Autenticacion Correcta");
        httpResponse.put("Username", user.getUsername());
        httpResponse.put("id", userEntity.getId());

        response.getWriter().write(new ObjectMapper().writeValueAsString(httpResponse));
        response.setStatus(HttpStatus.OK.value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.getWriter().flush();

        super.successfulAuthentication(request, response, chain, authResult);
    }
}
