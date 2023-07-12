package com.no_country.project_ninja.api.domain.space.dto;

import com.no_country.project_ninja.api.domain.task.Task;
import com.no_country.project_ninja.api.domain.workspace.Workspace;

import java.util.HashSet;
import java.util.Set;

public class SpaceDTO {
    private Long id;
    private String nameSpace;
    private String description;
    private Workspace workspace;
    private Set<Task> tasks= new HashSet<>();

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

    public Set<Task> getTasks() {
        return tasks;
    }

    public void setTasks(Set<Task> tasks) {
        this.tasks = tasks;
    }
}
