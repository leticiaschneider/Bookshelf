import { Component, OnDestroy, OnInit } from '@angular/core';
import { Book } from '../../../model/book.model';
import { BookService } from '../../../service/book.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent implements OnInit, OnDestroy {
  books: Book[] = [];
  bookDataToDelete?: Book;
  hiddenModal: boolean = true;
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(): void {
    this.bookService.getBooks().subscribe(
      (data) => {
        this.books = data;
      },
      (error) => {
        console.error('Error fetching books: ', error);
      }
    );
  }

  openModal(book: Book) {
    this.bookDataToDelete = book;
    this.hiddenModal = false;
  }

  closeModal () {
    this.hiddenModal = true;
  }

  deleteBook(): void {
    if (this.bookDataToDelete?.id !== undefined) {
      this.bookService.deleteBook(this.bookDataToDelete.id)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          (response) => {
            this.hiddenModal = true;
            this.getBooks();
            console.log('Book deleted successfully:', response);
          },
          (error) => {
            console.error('Error deleting the book:', error);
          }
        );
    } else {
      console.error('Invalid ID provided for deletion.');
    }
  }


  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
