package com.bookshelf.controllers;

import java.util.List;
import java.util.HashMap;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bookshelf.domain.Book;
import com.bookshelf.services.BookService;

@RestController
@RequestMapping(value = "/books")
@CrossOrigin(origins = "http://localhost:4200")
public class BookController {
	
	@Autowired
	private BookService service;
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<Book> findById(@PathVariable Integer id) {
		Book obj = service.findById(id);
		return ResponseEntity.ok().body (obj);
	}
	
	@GetMapping
	public ResponseEntity<List<Book>> findAll() {
	    List<Book> list = service.findAll();
	    return ResponseEntity.ok().body(list);
	}
	
	@PostMapping
	public Book createEmployee(@Valid @RequestBody Book book) {
		return service.createBook(book);
	}
	
	@PutMapping(value = "/{id}")
	public ResponseEntity<Book> update(@PathVariable Integer id, @Valid @RequestBody Book book) {
	    Book updatedBook = service.update(id, book);
	    return ResponseEntity.ok().body(updatedBook);
	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Map<String, Boolean>> delete(@PathVariable Integer id) {
        service.delete(id); 
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

}