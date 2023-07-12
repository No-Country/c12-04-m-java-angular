package com.no_country.project_ninja.api.domain.priority.dto;

public class PriorityTaskDTO {
    private Long id;
    private String namePriority;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNamePriority() {
        return namePriority;
    }

    public void setNamePriority(String namePriority) {
        this.namePriority = namePriority;
    }
}
