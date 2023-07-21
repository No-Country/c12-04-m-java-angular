package com.no_country.project_ninja.api.controller.priority;

import com.no_country.project_ninja.api.domain.priority.PriorityTask;
import com.no_country.project_ninja.api.domain.priority.PriorityTaskRepository;
import com.no_country.project_ninja.api.domain.priority.dto.PriorityTaskDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/priority")
public class PriorityController {
    @Autowired
    private PriorityTaskRepository priorityTaskRepository;

    @GetMapping
    public ResponseEntity<List<PriorityTaskDTO>> getPriorityTasks() {
        List<PriorityTask> priorityTasks = priorityTaskRepository.findAll();

        List<PriorityTaskDTO> priorityTasksDTOs = priorityTasks.stream()
                .map(this::mapPriorityToDTO)
                .collect(Collectors.toList());

        return ResponseEntity.ok(priorityTasksDTOs);
    }

    @PostMapping
    public ResponseEntity<PriorityTaskDTO> createWorkspace(@RequestBody PriorityTaskDTO priorityTaskDTO) {
        PriorityTask priorityTask = new PriorityTask();
        priorityTask.setNamePriority(priorityTaskDTO.getNamePriority());

        PriorityTask createdPriority = priorityTaskRepository.save(priorityTask);
        PriorityTaskDTO createdPriorityTaskDTO = mapPriorityToDTO(createdPriority);

        return ResponseEntity.status(HttpStatus.CREATED).body(createdPriorityTaskDTO);
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteWorkspace(@RequestParam Long id) {
        Optional<PriorityTask> priorityTaskOptional = priorityTaskRepository.findById(id);

        if (priorityTaskOptional.isPresent()) {
            PriorityTask priorityTask = priorityTaskOptional.get();
            priorityTaskRepository.delete(priorityTask);

            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    private PriorityTaskDTO mapPriorityToDTO(PriorityTask priorityTask) {
        PriorityTaskDTO priorityTaskDTO = new PriorityTaskDTO();

        priorityTaskDTO.setId(priorityTask.getId());
        priorityTaskDTO.setNamePriority(priorityTask.getNamePriority());

        return priorityTaskDTO;
    }
}
