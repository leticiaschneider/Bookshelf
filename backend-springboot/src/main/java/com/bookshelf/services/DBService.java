package com.bookshelf.services;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org. springframework.stereotype.Service;

import com.bookshelf.domain.Book;
import com.bookshelf.repositories.BookRepository;

@Service
public class DBService {
	
	@Autowired
	private BookRepository bookrepository;
	
	public void instanceDB() {
		Book book1 = new Book(0, null, "Jogos Vorazes", "Autor", null, 0, 0, null, null, null);
		bookrepository.saveAll(Arrays.asList(book1));
	}
}
