package com.no_country.project_ninja.api.domain.user;

import com.no_country.project_ninja.api.domain.task.Task;
import com.no_country.project_ninja.api.domain.workspace.Workspace;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {

}
