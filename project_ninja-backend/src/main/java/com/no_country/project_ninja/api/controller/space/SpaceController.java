package com.no_country.project_ninja.api.controller.space;
import com.no_country.project_ninja.api.domain.space.Space;
import com.no_country.project_ninja.api.domain.workspace.Workspace;
import com.no_country.project_ninja.api.domain.space.SpaceRepository;
import com.no_country.project_ninja.api.domain.space.dto.SpaceDTO;
import com.no_country.project_ninja.api.domain.workspace.WorkspaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.stream.Collectors;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/space")
@CrossOrigin()
public class SpaceController {

    @Autowired
    private WorkspaceRepository workspaceRepository;
    @Autowired
    private SpaceRepository spaceRepository;

    @GetMapping("/workspace")
    public ResponseEntity<List<SpaceDTO>> getSpacesByWorkspace(@RequestParam Long workspaceId) {
        Optional<Workspace> workspaceOptional = workspaceRepository.findById(workspaceId);

        if (workspaceOptional.isPresent()) {
            Workspace workspace = workspaceOptional.get();
            List<Space> spaces = spaceRepository.findByWorkspace(workspace);

            List<SpaceDTO> spaceDTOs = spaces.stream()
                    .map(this::mapSpaceToDTO)
                    .collect(Collectors.toList());

            return ResponseEntity.ok(spaceDTOs);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<SpaceDTO> getSpace(@RequestParam Long id) {
        Optional<Space> spaceOptional = spaceRepository.findById(id);

        if (spaceOptional.isPresent()) {
            Space space = spaceOptional.get();
            SpaceDTO spaceDTO= mapSpaceToDTO(space);

            return ResponseEntity.ok(spaceDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<SpaceDTO> createSpace(@RequestParam Long workspaceId, @RequestBody SpaceDTO spaceDTO) {
        Space space = new Space();
        space.setNameSpace(spaceDTO.getNameSpace());
        space.setDescription(spaceDTO.getDescription());


        Optional<Workspace> workspaceOptional = workspaceRepository.findById(workspaceId);

        if (workspaceOptional.isPresent()) {
            Workspace workspace = workspaceOptional.get();

            // Asignar el espacio al workspace
            space.setWorkspace(workspace);
            workspace.getSpaces().add(space);

            // Guardar el espacio y el workspace
            Space createdSpace = spaceRepository.save(space);
            workspaceRepository.save(workspace);

            SpaceDTO createdSpaceDTO = mapSpaceToDTO(createdSpace);

            return ResponseEntity.status(HttpStatus.CREATED).body(createdSpaceDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping
    public ResponseEntity<SpaceDTO> updateSpace(@RequestParam Long id, @RequestBody SpaceDTO spaceDTO) {
        Optional<Space> spaceOptional = spaceRepository.findById(id);

        if (spaceOptional.isPresent()) {
            Space space = spaceOptional.get();
            space.setNameSpace(spaceDTO.getNameSpace());
            space.setDescription(spaceDTO.getDescription());

            // Guardar el espacio actualizado
            Space updatedSpace = spaceRepository.save(space);
            SpaceDTO updatedSpaceDTO = mapSpaceToDTO(updatedSpace);

            return ResponseEntity.ok(updatedSpaceDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping
    public ResponseEntity<String> deleteSpace(@RequestParam Long id) {
        Optional<Space> spaceOptional = spaceRepository.findById(id);

        if (spaceOptional.isPresent()) {
            Space space = spaceOptional.get();

            // Eliminar el espacio del workspace
            space.getWorkspace().getSpaces().remove(space);

            // Eliminar el espacio
            spaceRepository.delete(space);

            return ResponseEntity.ok("Space deleted successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    private SpaceDTO mapSpaceToDTO(Space space) {
        SpaceDTO spaceDTO = new SpaceDTO();
        spaceDTO.setId(space.getId());
        spaceDTO.setNameSpace(space.getNameSpace());
        spaceDTO.setDescription(space.getDescription());
        spaceDTO.setTasks(space.getTaskSimpleDTOs());

        return spaceDTO;
    }

}
