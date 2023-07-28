package com.no_country.project_ninja.api.controller.workspace;

import com.no_country.project_ninja.api.domain.user.UserEntity;
import com.no_country.project_ninja.api.domain.user.UserRepository;
import com.no_country.project_ninja.api.domain.workspace.Workspace;
import com.no_country.project_ninja.api.domain.workspace.WorkspaceRepository;
import com.no_country.project_ninja.api.domain.workspace.dto.WorkspaceDTO;
import com.no_country.project_ninja.api.infra.security.jwt.TokenUtils;
import jakarta.servlet.http.HttpServletRequest;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/workspace")
@CrossOrigin()
public class WorkspaceController {

    @Autowired
    private WorkspaceRepository workspaceRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TokenUtils tokenUtils;

    @GetMapping("/all-workspaces-database")
    public ResponseEntity<List<WorkspaceDTO>> getAllWorkspaces() {
        List<Workspace> workspaces = workspaceRepository.findAll();

        List<WorkspaceDTO> workspaceDTOs = workspaces.stream()
                .map(this::mapWorkspaceToDTO)
                .collect(Collectors.toList());

        return ResponseEntity.ok(workspaceDTOs);
    }

    @GetMapping
    public ResponseEntity<List<WorkspaceDTO>> getWorkspacesForUser(@NonNull HttpServletRequest request) {
        String tokenHeader= request.getHeader("Authorization");

        UserEntity userToFilter= new UserEntity();
        if(tokenHeader != null && tokenHeader.startsWith("Bearer ")) {
            String token = tokenHeader.substring(7);

            if (tokenUtils.validToken(token)) {
                String email = tokenUtils.getUserFromToken(token);
                userToFilter = (UserEntity) userRepository.findByEmail(email).orElseThrow(
                        () -> new UsernameNotFoundException("not found user: "+email));
            }
        }
        List<Workspace> workspaces = workspaceRepository.findAll();

        UserEntity finalUserToFilter = userToFilter;

        List<WorkspaceDTO> workspaceDTOs = workspaces.stream()
                .filter(workspace -> workspace.getUserEntities().contains(finalUserToFilter))
                .map(this::mapWorkspaceToDTO)
                .collect(Collectors.toList());

        return ResponseEntity.ok(workspaceDTOs);
    }

    @PostMapping
    public ResponseEntity<WorkspaceDTO> createWorkspace(@RequestBody WorkspaceDTO workspaceDTO, @NonNull HttpServletRequest request) {
        Workspace workspace = new Workspace();
        workspace.setNameWorkspace(workspaceDTO.getNameWorkspace());
        workspace.setDescription(workspaceDTO.getDescription());

        String tokenHeader= request.getHeader("Authorization");

        UserEntity userEntity= new UserEntity();

        if(tokenHeader != null && tokenHeader.startsWith("Bearer ")) {
            String token = tokenHeader.substring(7);

            if (tokenUtils.validToken(token)) {
                String email = tokenUtils.getUserFromToken(token);
                userEntity = (UserEntity) userRepository.findByEmail(email).orElseThrow(
                        () -> new UsernameNotFoundException("not found user: "+email));
            }
        }
        UserEntity userEntityToAdd= userEntity;

        // Asignamos el usuario actual al conjunto userEntities del Workspace
        workspace.getUserEntities().add(userEntityToAdd);


        Workspace createdWorkspace = workspaceRepository.save(workspace);
        WorkspaceDTO createdWorkspaceDTO = mapWorkspaceToDTO(createdWorkspace);

        return ResponseEntity.status(HttpStatus.CREATED).body(createdWorkspaceDTO);
    }

    @PutMapping
    public ResponseEntity<WorkspaceDTO> updateWorkspace(@RequestParam Long id, @RequestBody WorkspaceDTO workspaceDTO) {
        Optional<Workspace> workspaceOptional = workspaceRepository.findById(id);

        if (workspaceOptional.isPresent()) {
            Workspace workspace = workspaceOptional.get();
            workspace.setNameWorkspace(workspaceDTO.getNameWorkspace());
            workspace.setDescription(workspaceDTO.getDescription());


            Workspace updatedWorkspace = workspaceRepository.save(workspace);
            WorkspaceDTO updatedWorkspaceDTO = mapWorkspaceToDTO(updatedWorkspace);

            return ResponseEntity.ok(updatedWorkspaceDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteWorkspace(@RequestParam Long id) {
        Optional<Workspace> workspaceOptional = workspaceRepository.findById(id);

        if (workspaceOptional.isPresent()) {
            Workspace workspace = workspaceOptional.get();
            workspaceRepository.delete(workspace);

            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/users")
    public ResponseEntity<String> addUserToWorkspace(@RequestParam Long workspaceId, @RequestParam Long userId) {
        Optional<Workspace> workspaceOptional = workspaceRepository.findById(workspaceId);
        Optional<UserEntity> userOptional = userRepository.findById(userId);

        if (workspaceOptional.isPresent() && userOptional.isPresent()) {
            Workspace workspace = workspaceOptional.get();
            UserEntity userEntity = userOptional.get();

            workspace.getUserEntities().add(userEntity);
            workspaceRepository.save(workspace);

            return ResponseEntity.ok("UserEntity added to workspace successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/users")
    public ResponseEntity<String> removeUserFromWorkspace(@RequestParam Long workspaceId, @RequestParam Long userId) {
        Optional<Workspace> workspaceOptional = workspaceRepository.findById(workspaceId);
        Optional<UserEntity> userOptional = userRepository.findById(userId);

        if (workspaceOptional.isPresent() && userOptional.isPresent()) {
            Workspace workspace = workspaceOptional.get();
            UserEntity userEntity = userOptional.get();

            workspace.getUserEntities().remove(userEntity);
            workspaceRepository.save(workspace);

            return ResponseEntity.ok("UserEntity removed from workspace successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }



    private WorkspaceDTO mapWorkspaceToDTO(Workspace workspace) {
        WorkspaceDTO workspaceDTO = new WorkspaceDTO();
        workspaceDTO.setId(workspace.getId());
        workspaceDTO.setNameWorkspace(workspace.getNameWorkspace());
        workspaceDTO.setDescription(workspace.getDescription());

        if(workspace.getUserEntities() != null)
            workspaceDTO.setUserSet(workspace.getUsersDTOs());

        if(workspace.getSpaces() != null)
            workspaceDTO.setSpace(workspace.getSpaceDTOs());

        return workspaceDTO;
    }

}
