package com.bookshelf.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.bookshelf.domain.Book;

@Repository
public interface BookRepository extends JpaRepository<Book, Integer> {

}
