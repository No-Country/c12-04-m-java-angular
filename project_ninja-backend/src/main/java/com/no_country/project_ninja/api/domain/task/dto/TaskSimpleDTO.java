package com.no_country.project_ninja.api.domain.task.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;


import java.util.Date;


public class TaskSimpleDTO {
    private Long id;
    @NotBlank
    private String nameTask;
    @NotBlank
    private String description;
    @NotNull
    @JsonFormat(pattern = "dd/MM/yyyy", timezone = "GMT-3")
    private Date dueDate;
    @NotNull
    private boolean status;
    @NotNull
    private Long priorityTask;


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

    public Long getPriorityTask() {
        return priorityTask;
    }

    public void setPriorityTask(Long priorityTask) {
        this.priorityTask = priorityTask;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }
}
