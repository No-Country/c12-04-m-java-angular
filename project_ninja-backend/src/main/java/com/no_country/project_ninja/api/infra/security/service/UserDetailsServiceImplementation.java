package com.no_country.project_ninja.api.infra.security.service;

import com.no_country.project_ninja.api.domain.user.UserEntity;
import com.no_country.project_ninja.api.domain.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;


@Service
public class UserDetailsServiceImplementation implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        UserEntity userEntity = (UserEntity) userRepository.findByEmail(email).orElseThrow(
                () -> new UsernameNotFoundException("not found user: "+email));


        Collection<? extends GrantedAuthority> authorities = List.of(new SimpleGrantedAuthority("ROLE_USER"));


        return new User(userEntity.getEmail(),
                userEntity.getPassword(),
                true,
                true,
                true,
                true,
                authorities);
    }
}
