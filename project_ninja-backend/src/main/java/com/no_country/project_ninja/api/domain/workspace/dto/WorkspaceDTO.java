package com.no_country.project_ninja.api.domain.workspace.dto;

import com.no_country.project_ninja.api.domain.space.dto.SpaceDTO;
import com.no_country.project_ninja.api.domain.user.UserEntity;
import com.no_country.project_ninja.api.domain.user.dto.UserDTO;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class WorkspaceDTO {
    private Long id;
    private String nameWorkspace;
    private String description;
    private Set<UserDTO> userEntitySet = new HashSet<>();
    private List<SpaceDTO> spaceSet= new ArrayList<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNameWorkspace() {
        return nameWorkspace;
    }

    public void setNameWorkspace(String nameWorkspace) {
        this.nameWorkspace = nameWorkspace;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<UserDTO> getUserSet() {
        return userEntitySet;
    }

    public void setUserSet(Set<UserDTO> userEntitySet) {
        this.userEntitySet = userEntitySet;
    }

    public List<SpaceDTO> getSpaceSet() {
        return spaceSet;
    }

    public void setSpace(List<SpaceDTO> spaceSet) {
        this.spaceSet = spaceSet;
    }
}
