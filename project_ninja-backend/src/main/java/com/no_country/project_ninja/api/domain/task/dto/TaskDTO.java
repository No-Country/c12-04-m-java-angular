package com.no_country.project_ninja.api.domain.task.dto;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.no_country.project_ninja.api.domain.priority.PriorityTask;
import com.no_country.project_ninja.api.domain.user.UserEntity;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

public class TaskDTO {
    private Long id;
    private String nameTask;
    private String description;
    @JsonFormat(pattern = "dd/MM/yyyy", timezone = "GMT-3")
    private Date dueDate;
    private PriorityTask priorityTask;
    private boolean status;
    private Set<UserEntity> userEntitySet = new HashSet<>();

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

    public Set<UserEntity> getUserSet() {
        return userEntitySet;
    }

    public void setUserSet(Set<UserEntity> userEntitySet) {
        this.userEntitySet = userEntitySet;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }
}
