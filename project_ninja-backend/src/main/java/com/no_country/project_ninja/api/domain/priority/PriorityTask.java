package com.no_country.project_ninja.api.domain.priority;

import com.no_country.project_ninja.api.domain.task.Task;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "priority")
@Entity(name = "PriorityTask")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class PriorityTask {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name_priority", length = 50)
    private String namePriority;

    @OneToOne
    @JoinColumn(name = "task_id")
    private Task task;

    public Task getTask() {
        return task;
    }

    public void setTask(Task task) {
        this.task = task;
    }

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