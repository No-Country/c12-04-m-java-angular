package com.no_country.project_ninja.api.domain.workspace;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.no_country.project_ninja.api.domain.space.Space;
import com.no_country.project_ninja.api.domain.space.dto.SpaceDTO;
import com.no_country.project_ninja.api.domain.user.UserEntity;
import com.no_country.project_ninja.api.domain.user.dto.UserDTO;
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
            inverseJoinColumns = @JoinColumn(name = "user_id") // Column name in the join table referring to UserEntity
    )
    @JsonIgnore
    private Set<UserEntity> userEntities = new HashSet<>();

    @OneToMany(mappedBy = "workspace")
    @JsonIgnore
    private List<Space> spaces;

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

    public Set<UserEntity> getUserEntities() {
        return userEntities;
    }

    public void setUserEntities(Set<UserEntity> userEntities) {
        this.userEntities = userEntities;
    }

    public List<SpaceDTO> getSpaceDTOs() {
        return this.spaces.stream()
                .map(this::mapSpaceToDTO)
                .collect(Collectors.toList());
    }

    public Set<UserDTO> getUsersDTOs(){
        return this.userEntities.stream()
                .map(this::mapUserToDTO)
                .collect(Collectors.toSet());
    }


    private UserDTO mapUserToDTO(UserEntity userEntity){
        UserDTO userDTO= new UserDTO();

        userDTO.setId(userEntity.getId());
        userDTO.setName(userEntity.getName());
        userDTO.setEmail(userEntity.getEmail());
        userDTO.setTeamRol(userEntity.getTeamRol());

        return userDTO;
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
