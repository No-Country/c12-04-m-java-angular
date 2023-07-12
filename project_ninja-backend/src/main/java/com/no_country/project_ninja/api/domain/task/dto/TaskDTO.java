package com.no_country.project_ninja.api.domain.task.dto;

import com.no_country.project_ninja.api.domain.priority.PriorityTask;
import com.no_country.project_ninja.api.domain.space.Space;
import com.no_country.project_ninja.api.domain.user.User;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

public class TaskDTO {
    private Long id;
    private String nameTask;
    private String description;
    private Date dueDate;
    private PriorityTask priorityTask;
    private Space space;
    private Set<User> userSet= new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNameTask() {
        return nameTask;
    }

    public void setNameTask(String nameTask) {
        this.nameTask = nameTask;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getDueDate() {
        return dueDate;
    }

    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }

    public PriorityTask getPriorityTask() {
        return priorityTask;
    }

    public void setPriorityTask(PriorityTask priorityTask) {
        this.priorityTask = priorityTask;
    }

    public Set<User> getUserSet() {
        return userSet;
    }

    public void setUserSet(Set<User> userSet) {
        this.userSet = userSet;
    }

    public Space getSpace() {
        return space;
    }

    public void setSpace(Space space) {
        this.space = space;
    }
}
