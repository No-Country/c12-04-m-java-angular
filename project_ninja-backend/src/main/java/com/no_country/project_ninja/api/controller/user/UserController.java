package com.no_country.project_ninja.api.controller.user;

import com.no_country.project_ninja.api.domain.user.DataUser;
import com.no_country.project_ninja.api.domain.user.User;
import com.no_country.project_ninja.api.domain.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/users")
    public ResponseEntity<List<DataUser>> listUsers() {
        return ResponseEntity.ok(userRepository.findAll().stream().map(DataUser::new).collect(Collectors.toList()));
    }

    @GetMapping
    public ResponseEntity<DataUser> DataUser(@RequestParam Long id){
        User user= userRepository.getReferenceById(id);
        var data= new DataUser(user);
        return ResponseEntity.ok(data);
    }
}




















