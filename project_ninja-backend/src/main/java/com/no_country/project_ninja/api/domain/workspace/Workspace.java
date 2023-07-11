package com.no_country.project_ninja.api.domain.workspace;

import com.no_country.project_ninja.api.domain.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Set;

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

    @Column(length = 255)
    private String description;

    @ManyToMany
    @JoinTable(
            name = "user_workspace", // Name of the join table
            joinColumns = @JoinColumn(name = "workspace_id"), // Column name in the join table referring to Workspace
            inverseJoinColumns = @JoinColumn(name = "user_id") // Column name in the join table referring to User
    )
    private Set<User> users;

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
}
