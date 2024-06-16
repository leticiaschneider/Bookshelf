package com.bookshelf.controllers.exceptions;

import java.time.Instant;
import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import com.bookshelf.services.exceptions.ObjectNotFoundException;


@ControllerAdvice
public class ControllerExceptionHandler {
	
	@ExceptionHandler(ObjectNotFoundException.class)
	public ResponseEntity<StandardError> handleAllExceptions(Exception ex, WebRequest request) {
        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
        StandardError err = new StandardError(
            Instant.now().toEpochMilli(),
            status.value(),
            "Internal Server Error",
            ex.getMessage(),
            request.getDescription(false)
        );

        return new ResponseEntity<>(err, status);
    }
	
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<StandardError> validationErrors(MethodArgumentNotValidException ex,
			WebRequest request) {

		ValidationError errors = new ValidationError(System.currentTimeMillis(), HttpStatus.BAD_REQUEST.value(), 
				"Validation error", "Validation error in fields", request.getDescription(false));
		
		for(FieldError x : ex.getBindingResult().getFieldErrors()) {
			errors.addError(x.getField(), x.getDefaultMessage());
		}

		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
	}
}
