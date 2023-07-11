package com.no_country.project_ninja.api.domain.priority;

import jakarta.validation.constraints.NotBlank;

public record DataRegisterPriorityTask(
        @NotBlank
        String name_priority
) { }