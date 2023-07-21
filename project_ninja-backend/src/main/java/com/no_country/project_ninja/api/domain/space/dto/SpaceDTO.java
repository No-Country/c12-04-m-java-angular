package com.no_country.project_ninja.api.domain.space.dto;
import com.no_country.project_ninja.api.domain.task.dto.TaskDTO;



import java.util.List;


public class SpaceDTO {
    private Long id;
    private String nameSpace;
    private String description;
    private List<TaskDTO> tasks;

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

    public List<TaskDTO> getTasks() {
        return tasks;
    }

    public void setTasks(List<TaskDTO> tasks) {
        this.tasks = tasks;
    }


}
