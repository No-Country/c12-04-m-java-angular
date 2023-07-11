package com.no_country.project_ninja.api.domain.space;

import jakarta.validation.constraints.NotBlank;

public record DataRegisterSpace(
        @NotBlank
        String nameSpace,
        String description
) {
}
