package com.no_country.project_ninja.api.controller.workspace;

import com.no_country.project_ninja.api.domain.user.User;
import com.no_country.project_ninja.api.domain.user.UserRepository;
import com.no_country.project_ninja.api.domain.workspace.Workspace;
import com.no_country.project_ninja.api.domain.workspace.WorkspaceRepository;
import com.no_country.project_ninja.api.domain.workspace.dto.WorkspaceDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/workspace")
public class WorkspaceController {

    @Autowired
    private WorkspaceRepository workspaceRepository;
    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<WorkspaceDTO>> getAllWorkspaces() {
        List<Workspace> workspaces = workspaceRepository.findAll();

        List<WorkspaceDTO> workspaceDTOs = workspaces.stream()
                .map(this::mapWorkspaceToDTO)
                .collect(Collectors.toList());

        return ResponseEntity.ok(workspaceDTOs);
    }

    @PostMapping
    public ResponseEntity<WorkspaceDTO> createWorkspace(@RequestBody WorkspaceDTO workspaceDTO) {
        Workspace workspace = new Workspace();
        workspace.setNameWorkspace(workspaceDTO.getNameWorkspace());
        workspace.setDescription(workspaceDTO.getDescription());

        Workspace createdWorkspace = workspaceRepository.save(workspace);
        WorkspaceDTO createdWorkspaceDTO = mapWorkspaceToDTO(createdWorkspace);

        return ResponseEntity.status(HttpStatus.CREATED).body(createdWorkspaceDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<WorkspaceDTO> updateWorkspace(@PathVariable Long id, @RequestBody WorkspaceDTO workspaceDTO) {
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

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWorkspace(@PathVariable Long id) {
        Optional<Workspace> workspaceOptional = workspaceRepository.findById(id);

        if (workspaceOptional.isPresent()) {
            Workspace workspace = workspaceOptional.get();
            workspaceRepository.delete(workspace);

            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{workspaceId}/users/{userId}")
    public ResponseEntity<String> addUserToWorkspace(@PathVariable Long workspaceId, @PathVariable Long userId) {
        Optional<Workspace> workspaceOptional = workspaceRepository.findById(workspaceId);
        Optional<User> userOptional = userRepository.findById(userId);

        if (workspaceOptional.isPresent() && userOptional.isPresent()) {
            Workspace workspace = workspaceOptional.get();
            User user = userOptional.get();

            workspace.getUsers().add(user);
            workspaceRepository.save(workspace);

            return ResponseEntity.ok("User added to workspace successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{workspaceId}/users/{userId}")
    public ResponseEntity<String> removeUserFromWorkspace(@PathVariable Long workspaceId, @PathVariable Long userId) {
        Optional<Workspace> workspaceOptional = workspaceRepository.findById(workspaceId);
        Optional<User> userOptional = userRepository.findById(userId);

        if (workspaceOptional.isPresent() && userOptional.isPresent()) {
            Workspace workspace = workspaceOptional.get();
            User user = userOptional.get();

            workspace.getUsers().remove(user);
            workspaceRepository.save(workspace);

            return ResponseEntity.ok("User removed from workspace successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }



    private WorkspaceDTO mapWorkspaceToDTO(Workspace workspace) {
        WorkspaceDTO workspaceDTO = new WorkspaceDTO();
        workspaceDTO.setId(workspace.getId());
        workspaceDTO.setNameWorkspace(workspace.getNameWorkspace());
        workspaceDTO.setDescription(workspace.getDescription());
        workspaceDTO.setUserSet(workspace.getUsers());
        workspaceDTO.setSpaceSet(workspace.getSpaces());

        return workspaceDTO;
    }

}
