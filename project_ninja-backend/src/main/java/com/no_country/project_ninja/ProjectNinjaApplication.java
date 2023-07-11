package com.no_country.project_ninja;

import org.flywaydb.core.Flyway;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.flyway.FlywayMigrationInitializer;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class ProjectNinjaApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProjectNinjaApplication.class, args);
	}

}
