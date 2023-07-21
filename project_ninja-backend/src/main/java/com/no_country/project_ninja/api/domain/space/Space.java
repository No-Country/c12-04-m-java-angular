package com.no_country.project_ninja.api.domain.space;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.no_country.project_ninja.api.domain.task.Task;
import com.no_country.project_ninja.api.domain.task.dto.TaskDTO;
import com.no_country.project_ninja.api.domain.workspace.Workspace;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Table(name = "space")
@Entity(name = "Space")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Space {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name_space", length = 20)
    private String nameSpace;

    @Column(length = 200)
    private String description;

    @ManyToOne
    @JoinColumn(name = "workspace")
    private Workspace workspace;

    @OneToMany(mappedBy = "space")
    @JsonIgnore
    private List<Task> tasks= new ArrayList<>();


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNameSpace() {
        return nameSpace;
    }

    public void setNameSpace(String nameSpace) {
        this.nameSpace = nameSpace;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Workspace getWorkspace() {
        return workspace;
    }

    public void setWorkspace(Workspace workspace) {
        this.workspace = workspace;
    }

    public List<TaskDTO> getTaskSimpleDTOs() {
        return this.tasks.stream()
                .map(this::mapTaskToDTO)
                .collect(Collectors.toList());
    }

    private TaskDTO mapTaskToDTO(Task task) {
        TaskDTO taskDTO = new TaskDTO();
        taskDTO.setId(task.getId());
        taskDTO.setNameTask(task.getNameTask());
        taskDTO.setDescription(task.getDescription());
        taskDTO.setDueDate(task.getDueDate());
        taskDTO.setStatus(task.isStatus());
        taskDTO.setPriorityTask(task.getPriorityTask());
        taskDTO.setUserSet(task.getUsers());

        return taskDTO;
    }
}


