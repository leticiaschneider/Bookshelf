package com.bookshelf.services;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bookshelf.domain.Book;
import com.bookshelf.repositories.BookRepository;

@Service
public class BookService {
	
	@Autowired
	private BookRepository repository;

	public Book findById(Integer id) {
		Optional<Book> obj = repository.findById(id);
		return  obj.orElse(null);
		
//		return obj.orElseThrow(() -> new ObjectnotFoundException("Objeto não encontrado! Id: " + id));
	}

	public List<Book> findAll() {
		return repository.findAll();
	}

}