package com.no_country.project_ninja.api.domain.workspace;

import com.no_country.project_ninja.api.domain.user.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WorkspaceRepository extends JpaRepository<Workspace, Long> {
}

