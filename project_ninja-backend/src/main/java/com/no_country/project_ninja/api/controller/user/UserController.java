package com.no_country.project_ninja.api.controller.user;
import com.no_country.project_ninja.api.domain.task.Task;
import com.no_country.project_ninja.api.domain.task.TaskRepository;
import com.no_country.project_ninja.api.domain.user.UserEntity;
import com.no_country.project_ninja.api.domain.user.UserRepository;
import com.no_country.project_ninja.api.domain.user.dto.UserDTO;
import com.no_country.project_ninja.api.domain.user.dto.UserPassDTO;
import com.no_country.project_ninja.api.domain.user.dto.UserRegisterDTO;
import com.no_country.project_ninja.api.domain.workspace.Workspace;
import com.no_country.project_ninja.api.domain.workspace.WorkspaceRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TaskRepository taskRepository;
    @Autowired
    private WorkspaceRepository workspaceRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/users")
    public ResponseEntity<List<UserDTO>> listUsers() {
        return ResponseEntity.ok(userRepository.findAll().stream().map(this::mapUserToDTO).collect(Collectors.toList()));
    }

    @GetMapping
    public ResponseEntity<UserDTO> dataUser(@RequestParam Long id){
        Optional<UserEntity> userOptional= userRepository.findById(id);

        if(userOptional.isPresent()){
            UserDTO data= mapUserToDTO(userOptional.get());
            return ResponseEntity.ok(data);
        }else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/register")
    public ResponseEntity<UserDTO> createUser(@RequestBody @Valid UserRegisterDTO userRegisterDTO){
        UserEntity userEntity = new UserEntity();

        userEntity.setName(userRegisterDTO.getName());
        userEntity.setEmail(userRegisterDTO.getEmail());
        userEntity.setPassword(passwordEncoder.encode(userRegisterDTO.getPassword()));
        userEntity.setTeamRol(userRegisterDTO.getTeamRol());

        UserEntity userEntityCreated = userRepository.save(userEntity);
        UserDTO userDTO= mapUserToDTO(userEntityCreated);

        return ResponseEntity.status(HttpStatus.CREATED).body(userDTO);
    }

    @PutMapping
    public ResponseEntity<UserDTO> updateUser(@RequestParam Long id, @RequestBody @Valid UserDTO userDTO){
        Optional<UserEntity> userOptional= userRepository.findById(id);

        if (userOptional.isPresent()){
            UserEntity userEntity = userOptional.get();
            userEntity.setName(userDTO.getName());
            userEntity.setEmail(userDTO.getEmail());
            userEntity.setTeamRol(userDTO.getTeamRol());

            UserEntity userEntityUpdated = userRepository.save(userEntity);

            UserDTO userUpdatedDTO= mapUserToDTO(userEntityUpdated);

            return ResponseEntity.ok().body(userUpdatedDTO);
        }else{
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/password")
    public ResponseEntity<String> updatePassword(@RequestParam Long id, @RequestBody @Valid UserPassDTO userPassDTO){
        Optional<UserEntity> userOptional= userRepository.findById(id);

        if (userOptional.isPresent()){
            UserEntity userEntity = userOptional.get();

            userEntity.setPassword(passwordEncoder.encode(userPassDTO.getPassword()));

            userRepository.save(userEntity);

            return ResponseEntity.ok().body("Password updated successful");
        }else {
            return ResponseEntity.notFound().build();
        }
    }


    @DeleteMapping
    public ResponseEntity<Void> deleteUser(@RequestParam Long id){
        Optional<UserEntity> userOptional= userRepository.findById(id);

        if(userOptional.isPresent()){
            UserEntity userEntity = userOptional.get();

            List<Task> tasks= userEntity.getTasks();
            List<Workspace> workspaces= userEntity.getWorkspaces();

            //Eliminar de tareas y workspace este usuario;
            for (Task task: tasks) {
                task.getUserEntities().remove(userEntity);
                taskRepository.save(task);
            }

            for (Workspace workspace:workspaces) {
                workspace.getUserEntities().remove(userEntity);
                workspaceRepository.save(workspace);
            }

            userRepository.delete(userEntity);

            return ResponseEntity.noContent().build();
        }else {
            return ResponseEntity.notFound().build();
        }
    }

    private UserDTO mapUserToDTO(UserEntity userEntity) {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(userEntity.getId());
        userDTO.setName(userEntity.getName());
        userDTO.setEmail(userEntity.getEmail());
        userDTO.setTeamRol(userEntity.getTeamRol());

        return userDTO;
    }
}




















