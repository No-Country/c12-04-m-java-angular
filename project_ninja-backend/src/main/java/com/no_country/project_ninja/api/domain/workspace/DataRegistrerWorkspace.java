package com.no_country.project_ninja.api.domain.workspace;

import com.no_country.project_ninja.api.domain.user.User;

public record DataRegistrerWorkspace(
    String nameWorkspace,
    String description,
    User users
) {}
