package com.bookshelf.services;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

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
	
	public Book update(Integer id, @Valid Book bookDetails) {

        Book book = repository.findById(id)
                .orElseThrow(() -> new ObjectNotFoundException("Book not exist with id: " + id));

        book.setTitle(bookDetails.getTitle());
        book.setAuthor(bookDetails.getAuthor());
        book.setPublicationYear(bookDetails.getPublicationYear());
        book.setLanguage(bookDetails.getLanguage());
        book.setPages(bookDetails.getPages());
        book.setGenre(bookDetails.getGenre());
        book.setCoverImageUrl(bookDetails.getCoverImageUrl());
        book.setReadingStatus(bookDetails.getReadingStatus());
        book.setFormat(bookDetails.getFormat());

        return repository.save(book);
    }

	public void delete(Integer id) {
		Book book = repository.findById(id)
                .orElseThrow(() -> new ObjectNotFoundException("Book not exist with id: " + id));

        repository.delete(book);
	}

}