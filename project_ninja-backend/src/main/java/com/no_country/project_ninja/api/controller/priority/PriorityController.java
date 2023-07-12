package com.no_country.project_ninja.api.controller.priority;

import com.no_country.project_ninja.api.domain.priority.PriorityTask;
import com.no_country.project_ninja.api.domain.priority.PriorityTaskRepository;
import com.no_country.project_ninja.api.domain.priority.dto.PriorityTaskDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
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

    private PriorityTaskDTO mapPriorityToDTO(PriorityTask priorityTask) {
        PriorityTaskDTO priorityTaskDTO = new PriorityTaskDTO();

        priorityTaskDTO.setId(priorityTask.getId());
        priorityTaskDTO.setNamePriority(priorityTask.getNamePriority());

        return priorityTaskDTO;
    }
}
