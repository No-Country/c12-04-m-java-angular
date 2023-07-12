package com.no_country.project_ninja.api.domain.task;

import com.no_country.project_ninja.api.domain.priority.PriorityTask;
import com.no_country.project_ninja.api.domain.space.Space;
import com.no_country.project_ninja.api.domain.user.User;

import java.util.Date;
import java.util.Set;

public record DataTask(String name, String description, Date dueDate, PriorityTask priorityTask, Space space,
                       Set<User> users) {
    public DataTask(Task task) {
        this(task.getNameTask(), task.getDescription(), task.getDueDate(), task.getPriorityTask(), task.getSpace(),
                task.getUsers());
    }
}
