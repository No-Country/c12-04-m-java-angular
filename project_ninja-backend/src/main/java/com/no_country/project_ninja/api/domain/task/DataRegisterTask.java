package com.no_country.project_ninja.api.domain.task;

import com.no_country.project_ninja.api.domain.priority.PriorityTask;
import com.no_country.project_ninja.api.domain.space.Space;
import com.no_country.project_ninja.api.domain.user.User;
import jakarta.validation.constraints.NotBlank;


public record DataRegisterTask(
        String name,
        String description,
        PriorityTask priorityTask,
        @NotBlank Space space,
        @NotBlank User user

) {
}
