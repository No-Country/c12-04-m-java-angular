package com.no_country.project_ninja.api.controller.task;

import com.no_country.project_ninja.api.domain.space.Space;
import com.no_country.project_ninja.api.domain.space.SpaceRepository;
import com.no_country.project_ninja.api.domain.task.DataTask;
import com.no_country.project_ninja.api.domain.task.Task;
import com.no_country.project_ninja.api.domain.task.TaskRepository;
import com.no_country.project_ninja.api.domain.task.dto.TaskDTO;
import com.no_country.project_ninja.api.domain.user.DataUser;
import com.no_country.project_ninja.api.domain.user.User;
import com.no_country.project_ninja.api.domain.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/task")
public class TaskController {

    @Autowired
    private TaskRepository taskRepository;
    @Autowired
    private SpaceRepository spaceRepository;
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/space/{spaceId}")
    public ResponseEntity<Page<TaskDTO>> getTasksBySpace(@PathVariable Long spaceId, Pageable pageable) {
        Optional<Space> spaceOptional = spaceRepository.findById(spaceId);

        if (spaceOptional.isPresent()) {
            Space space = spaceOptional.get();
            Page<Task> tasksPage = taskRepository.findBySpace(space, pageable);
            Page<TaskDTO> taskDTOPage = tasksPage.map(this::mapTaskToDTO);
            return ResponseEntity.ok(taskDTOPage);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @GetMapping("/{id}")
    public ResponseEntity<TaskDTO> getTaskById(@PathVariable Long id) {
        Optional<Task> taskOptional = taskRepository.findById(id);

        if (taskOptional.isPresent()) {
            Task task = taskOptional.get();
            TaskDTO taskDTO = mapTaskToDTO(task);
            return ResponseEntity.ok(taskDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<TaskDTO> createTask(@RequestBody TaskDTO taskDTO) {
        Task task = new Task();
        task.setNameTask(taskDTO.getNameTask());


        Optional<Space> spaceOptional = spaceRepository.findById(taskDTO.getSpace().getId());

        if (spaceOptional.isPresent()) {
            Space space = spaceOptional.get();

            // Agregar la tarea al espacio
            task.setSpace(space);
            space.getTasks().add(task);

            // Guardar la tarea y el espacio
            Task createdTask = taskRepository.save(task);
            spaceRepository.save(space);

            TaskDTO createdTaskDTO = mapTaskToDTO(createdTask);

            return ResponseEntity
                    .created(URI.create("/task/" + createdTaskDTO.getId()))
                    .body(createdTaskDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @PutMapping("/{id}")
    public ResponseEntity<TaskDTO> updateTask(@PathVariable Long id, @RequestBody TaskDTO taskDTO) {
        Optional<Task> taskOptional = taskRepository.findById(id);

        if (taskOptional.isPresent()) {
            Task task = taskOptional.get();
            task.setNameTask(taskDTO.getNameTask());
            task.setDescription(taskDTO.getDescription());
            task.setDueDate(taskDTO.getDueDate());
            task.setPriorityTask(taskDTO.getPriorityTask());

            Task updatedTask = taskRepository.save(task);
            TaskDTO updatedTaskDTO = mapTaskToDTO(updatedTask);

            return ResponseEntity.ok(updatedTaskDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTask(@PathVariable Long id) {
        Optional<Task> taskOptional = taskRepository.findById(id);

        if (taskOptional.isPresent()) {
            Task task = taskOptional.get();

            // Obtener el espacio al que pertenece la tarea
            Space space = task.getSpace();

            // Eliminar la tarea del espacio
            space.getTasks().remove(task);

            // Guardar los cambios en el espacio
            spaceRepository.save(space);

            // Eliminar la tarea
            taskRepository.delete(task);

            return ResponseEntity.ok("Task deleted successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @PostMapping("/{taskId}/users/{userId}")
    public ResponseEntity<TaskDTO> assignUserToTask(@PathVariable Long taskId, @PathVariable Long userId) {
        Optional<Task> taskOptional = taskRepository.findById(taskId);
        Optional<User> userOptional = userRepository.findById(userId);

        if (taskOptional.isPresent() && userOptional.isPresent()) {
            Task task = taskOptional.get();
            User user = userOptional.get();

            task.getUsers().add(user);
            user.getTaskSet().add(task);

            taskRepository.save(task);
            userRepository.save(user);

            TaskDTO taskDTO = mapTaskToDTO(task);
            return ResponseEntity.ok(taskDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{taskId}/users/{userId}")
    public ResponseEntity<TaskDTO> removeUserFromTask(@PathVariable Long taskId, @PathVariable Long userId) {
        Optional<Task> taskOptional = taskRepository.findById(taskId);
        Optional<User> userOptional = userRepository.findById(userId);

        if (taskOptional.isPresent() && userOptional.isPresent()) {
            Task task = taskOptional.get();
            User user = userOptional.get();

            task.getUsers().remove(user);
            user.getTaskSet().remove(task);

            taskRepository.save(task);
            userRepository.save(user);

            TaskDTO taskDTO = mapTaskToDTO(task);
            return ResponseEntity.ok(taskDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    private TaskDTO mapTaskToDTO(Task task) {
        TaskDTO taskDTO = new TaskDTO();
        taskDTO.setId(task.getId());
        taskDTO.setNameTask(task.getNameTask());
        taskDTO.setDescription(task.getDescription());
        taskDTO.setDueDate(task.getDueDate());
        taskDTO.setPriorityTask(task.getPriorityTask());
        taskDTO.setUserSet(task.getUsers());
        taskDTO.setSpace(task.getSpace());

        return taskDTO;
    }

}
