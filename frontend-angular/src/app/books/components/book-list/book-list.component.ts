import { Component, OnDestroy, OnInit } from '@angular/core';
import { Book } from '../../../model/book.model';
import { BookService } from '../../../service/book.service';
import { Subject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent implements OnInit, OnDestroy {
  books: Book[] = [];
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.bookService.getBooks().subscribe(
      (data) => {
        this.books = data;
      },
      (error) => {
        console.error('Error fetching books: ', error);
      }
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
