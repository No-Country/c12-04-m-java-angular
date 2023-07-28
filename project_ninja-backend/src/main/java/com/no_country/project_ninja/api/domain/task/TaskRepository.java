package com.no_country.project_ninja.api.domain.task;

import com.no_country.project_ninja.api.domain.space.Space;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findBySpace(Space space);

}
