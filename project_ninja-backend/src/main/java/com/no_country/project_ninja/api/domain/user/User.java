package com.no_country.project_ninja.api.domain.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.no_country.project_ninja.api.domain.subscription.Subscription;
import com.no_country.project_ninja.api.domain.task.Task;
import com.no_country.project_ninja.api.domain.workspace.Workspace;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Table(name = "users")
@Entity(name = "User")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 100)
    private String email;

    @Column(length = 100)
    private String name;

    @Column(length = 8)
    private String password;

    @Column(name = "team_rol")
    private String teamRol;

    @OneToOne(cascade = CascadeType.ALL)
    @PrimaryKeyJoinColumn(name = "subscription_type")
    private Subscription subscription;

    @ManyToMany(mappedBy = "users")
    @JsonIgnore
    private List<Task> taskSet= new ArrayList<>();

    @ManyToMany(mappedBy = "users")
    @JsonIgnore
    private List<Workspace> workspaceSet= new ArrayList<>();

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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Subscription getSubscription() {
        return subscription;
    }

    public void setSubscription(Subscription subscription) {
        this.subscription = subscription;
    }

    public String getTeamRol() {
        return teamRol;
    }

    public void setTeamRol(String teamRol) {
        this.teamRol = teamRol;
    }
}
