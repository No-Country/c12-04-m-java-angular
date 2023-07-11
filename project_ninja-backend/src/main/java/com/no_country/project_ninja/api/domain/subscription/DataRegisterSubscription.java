package com.no_country.project_ninja.api.domain.subscription;

import jakarta.validation.constraints.NotBlank;

public record DataRegisterSubscription(
    @NotBlank String nameSubscription

) {
}
