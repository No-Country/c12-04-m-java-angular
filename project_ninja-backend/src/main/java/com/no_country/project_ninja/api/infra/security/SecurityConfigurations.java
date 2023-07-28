package com.no_country.project_ninja.api.infra.security;

import com.no_country.project_ninja.api.domain.user.UserRepository;
import com.no_country.project_ninja.api.infra.security.filters.AuthenticationFilter;
import com.no_country.project_ninja.api.infra.security.filters.AuthorizationFilter;
import com.no_country.project_ninja.api.infra.security.jwt.TokenUtils;
import com.no_country.project_ninja.api.infra.security.service.UserDetailsServiceImplementation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


@Configuration
@EnableWebSecurity
public class SecurityConfigurations {
    @Autowired
    private TokenUtils tokenUtils;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserDetailsServiceImplementation userDetailsServiceImplementation;

    @Autowired
    private AuthorizationFilter authorizationFilter;


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity, AuthenticationManager authenticationManager) throws Exception {

        AuthenticationFilter authenticationFilter= new AuthenticationFilter(tokenUtils, userRepository);
        authenticationFilter.setAuthenticationManager(authenticationManager);

        return httpSecurity
                .csrf(config -> config.disable())
                .authorizeHttpRequests(
                        auth -> {
                            auth.requestMatchers("/user/register").permitAll();
                            auth.anyRequest().authenticated();
                        }
                )
                .sessionManagement(session -> {
                    session.sessionCreationPolicy(SessionCreationPolicy.STATELESS);
                })
                .addFilter(authenticationFilter)
                .addFilterBefore(authorizationFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
        //return NoOpPasswordEncoder.getInstance();
    }

    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity httpSecurity, PasswordEncoder passwordEncoder) throws Exception {
        //return authenticationConfiguration.getAuthenticationManager();
        //param: AuthenticationConfiguration authenticationConfiguration
        return httpSecurity.getSharedObject(AuthenticationManagerBuilder.class)
                .userDetailsService(userDetailsServiceImplementation)
                .passwordEncoder(passwordEncoder)
                .and().build();
    }

}


