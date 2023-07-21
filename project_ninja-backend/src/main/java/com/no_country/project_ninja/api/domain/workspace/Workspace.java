package com.no_country.project_ninja.api.domain.workspace;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.no_country.project_ninja.api.domain.space.Space;
import com.no_country.project_ninja.api.domain.space.dto.SpaceDTO;
import com.no_country.project_ninja.api.domain.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Table(name = "workspace")
@Entity(name = "Workspace")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Workspace {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name_workspace")
    private String nameWorkspace;

    @Column(length = 200)
    private String description;

    @ManyToMany
    @JoinTable(
            name = "users_workspace", // Name of the join table
            joinColumns = @JoinColumn(name = "workspace_id"), // Column name in the join table referring to Workspace
            inverseJoinColumns = @JoinColumn(name = "user_id") // Column name in the join table referring to User
    )
    @JsonIgnore
    private Set<User> users= new HashSet<>();

    @OneToMany(mappedBy = "workspace")
    @JsonIgnore
    private Set<Space> spaces;

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

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }

    public List<SpaceDTO> getSpaceDTOs() {
        return this.spaces.stream()
                .map(this::mapSpaceToDTO)
                .collect(Collectors.toList());
    }

    private SpaceDTO mapSpaceToDTO(Space space) {
        SpaceDTO spaceDTO = new SpaceDTO();
        spaceDTO.setId(space.getId());
        spaceDTO.setNameSpace(space.getNameSpace());
        spaceDTO.setDescription(space.getDescription());
        spaceDTO.setTasks(space.getTaskSimpleDTOs());

        return spaceDTO;
    }
}
