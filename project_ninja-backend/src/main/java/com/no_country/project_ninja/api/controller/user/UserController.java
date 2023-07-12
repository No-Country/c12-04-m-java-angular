package com.no_country.project_ninja.api.controller.user;

import com.no_country.project_ninja.api.domain.user.DataUser;
import com.no_country.project_ninja.api.domain.user.User;
import com.no_country.project_ninja.api.domain.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<Page<DataUser>> listUsers(Pageable pageable) {
        return ResponseEntity.ok(userRepository.findAll(pageable).map(DataUser::new));
    }

    @GetMapping("/{id}")
    public ResponseEntity<DataUser> DataUser(@PathVariable Long id){
        User user= userRepository.getReferenceById(id);
        var data= new DataUser(user);
        return ResponseEntity.ok(data);
    }
}




















