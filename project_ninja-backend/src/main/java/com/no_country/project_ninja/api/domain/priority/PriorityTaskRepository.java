package com.no_country.project_ninja.api.domain.priority;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PriorityTaskRepository extends JpaRepository<PriorityTask, Long>{

}