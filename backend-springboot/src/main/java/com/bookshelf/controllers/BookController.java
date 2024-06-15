package com.bookshelf.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.bookshelf.domain.Book;
import com.bookshelf.services.BookService;

@RestController
@RequestMapping(value = "/books")
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
	public Book createEmployee(@RequestBody Book book) {
		return service.createBook(book);
	}
}