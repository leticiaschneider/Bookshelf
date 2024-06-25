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

  deleteBook(id: number | undefined): void {
    if (id !== undefined) {
      this.bookService.deleteBook(id)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          (response) => {
            console.log('Book deleted successfully:', response);
            // Aqui você pode adicionar lógica para atualizar a lista de livros ou realizar outra ação necessária após a exclusão.
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
