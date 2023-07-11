package com.no_country.project_ninja.api.domain.space;

import com.no_country.project_ninja.api.domain.workspace.Workspace;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SpaceRepository extends JpaRepository<Space, Long> {
    Page<Space> findSpaceByWorkspace(Workspace workspace, Pageable pageable);
}
