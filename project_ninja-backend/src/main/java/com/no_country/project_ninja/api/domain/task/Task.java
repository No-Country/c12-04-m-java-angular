package com.no_country.project_ninja.api.domain.task;

import com.no_country.project_ninja.api.domain.priority.PriorityTask;
import com.no_country.project_ninja.api.domain.space.Space;
import com.no_country.project_ninja.api.domain.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Set;

@Table(name = "task")
@Entity(name = "Task")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name_task", length = 50)
    private String nameTask;

    @Column(length = 250)
    private String description;

    @ManyToOne
    @JoinColumn(name = "space_id")
    private Space space;

    @OneToOne(mappedBy = "task")
    private PriorityTask priorityTask;

    @ManyToMany
    @JoinTable(
            name = "user_task", // Name of the join table
            joinColumns = @JoinColumn(name = "task_id"), // Column name in the join table referring to Task
            inverseJoinColumns = @JoinColumn(name = "user_id") // Column name in the join table referring to User
    )
    private Set<User> users;

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

    public Space getSpace() {
        return space;
    }

    public void setSpace(Space space) {
        this.space = space;
    }

    public PriorityTask getPriorityTask() {
        return priorityTask;
    }

    public void setPriorityTask(PriorityTask priorityTask) {
        this.priorityTask = priorityTask;
    }

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }
}
