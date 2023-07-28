package com.no_country.project_ninja.api.infra.errors;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.dao.DataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;

@RestControllerAdvice
public class ErrorHandler {
    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<Void> error404(){
        return ResponseEntity.notFound().build();
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<List<ValidationDataError>> error400(MethodArgumentNotValidException e){
        var errors= e.getFieldErrors().stream().map(ValidationDataError::new).toList();
        return ResponseEntity.badRequest().body(errors);
    }

    @ExceptionHandler(DataAccessException.class)
    public ResponseEntity<String> handleDataAccessException(DataAccessException e) {
        String error = "Error accessing the database";
        return ResponseEntity.internalServerError().body(error);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleGenericException(Exception e) {
        String error = "Internal server error";
        return ResponseEntity.internalServerError().body(error);
    }

    private record ValidationDataError(String field, String error){
        public ValidationDataError(FieldError error){
            this(error.getField(), error.getDefaultMessage());
        }
    }
}
