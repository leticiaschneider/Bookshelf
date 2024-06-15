package com.bookshelf.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.bookshelf.domain.Book;
import com.bookshelf.repositories.BookRepository;
import com.bookshelf.services.exceptions.ObjectNotFoundException;

@Service
public class BookService {
	
	@Autowired
	private BookRepository repository;

	public Book findById(Integer id) {
		Optional<Book> obj = repository.findById(id);
		return obj.orElseThrow(() -> new ObjectNotFoundException("Object not found. ID: " + id));
	}

	public List<Book> findAll() {
		return repository.findAll();
	}
	
	@PostMapping
	public Book createBook(@RequestBody Book book) {
		return repository.save(book);
	}

}