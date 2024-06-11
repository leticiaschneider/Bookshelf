package com.bookshelf.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.bookshelf.domain.Book;

public interface BookRepository extends JpaRepository<Book, Integer> {

}
