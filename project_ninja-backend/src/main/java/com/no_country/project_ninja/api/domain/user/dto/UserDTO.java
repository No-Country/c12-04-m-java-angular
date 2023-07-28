package com.no_country.project_ninja.api.domain.user.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class UserDTO {
    private Long id;
    @NotBlank
    @Email
    private String email;
    @NotBlank
    private String name;
    @NotBlank
    private String teamRol;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTeamRol() {
        return teamRol;
    }

    public void setTeamRol(String teamRol) {
        this.teamRol = teamRol;
    }
}
