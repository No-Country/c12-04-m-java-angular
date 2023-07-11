package com.no_country.project_ninja.api.domain.workspace;

import com.no_country.project_ninja.api.domain.task.Task;
import com.no_country.project_ninja.api.domain.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

    public interface WorkspaceRepository extends JpaRepository<Workspace, Long> {
        Page<Workspace> findByUsers(User user, Pageable pageable);

        List<Workspace> findWorkspacesByUsers(User user);
    }
