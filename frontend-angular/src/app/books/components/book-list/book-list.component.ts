import { Component, OnDestroy, OnInit } from '@angular/core';
import { Book } from '../../../model/book.model';
import { BookService } from '../../../service/book.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent implements OnInit, OnDestroy {
  books: Book[] = [];
  booksForList: Book[] = [];
  bookDataToDelete?: Book;
  hiddenModal: boolean = true;
  private unsubscribe$: Subject<void> = new Subject<void>();
  sortDirection: boolean = true;
  errorObj = {
    hasMessage: false,
    message: "",
    typeMessage: undefined as 'success' | 'warning' | 'error' | undefined
  }

  paginator = {
    currentPage: 1,
    itemsPerPage: 7,
    totalItems: 0
  };

  constructor(
    private bookService: BookService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(pageNumber = 1): void {
    this.bookService.getBooks().subscribe(
      (data) => {
        this.books = data;
        this.paginator.totalItems = this.books.length;
      },
      (error) => {
        console.error('Error fetching books: ', error);
        this.errorObj.hasMessage = true;
        this.errorObj.typeMessage = "error";
        this.errorObj.message = 'Error fetching books';

        setTimeout(() => {
          this.errorObj.hasMessage = false;
          this.errorObj.message = '';
        }, 3000);
      }
    );
  }

  get paginatedBooks() {
    const startIndex = (this.paginator.currentPage - 1) * this.paginator.itemsPerPage;
    const endIndex = startIndex + this.paginator.itemsPerPage;
    return this.books.slice(startIndex, endIndex);
  }

  onPageChange(page: number): void {
    this.paginator.currentPage = page;
  }

  editItem(id?: number) {
    this.router.navigate(['/books/edit', id]);
  }

  openModal(book: Book) {
    this.bookDataToDelete = book;
    this.hiddenModal = false;
  }

  closeModal() {
    this.hiddenModal = true;
  }

  sortData(): void {
    this.sortDirection = !this.sortDirection;
    const direction = this.sortDirection ? 1 : -1;

    this.booksForList.sort((a, b) => {
      if (a.title < b.title) {
        return -1 * direction;
      } else if (a.title > b.title) {
        return 1 * direction;
      } else {
        return 0;
      }
    });
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
            this.errorObj.hasMessage = true;
            this.errorObj.typeMessage = "success";
            this.errorObj.message = 'Book deleted successfully';

            setTimeout(() => {
              this.errorObj.hasMessage = false;
              this.errorObj.message = '';
            }, 3000);
          },
          (error) => {
            console.error('Error deleting the book:', error);
            this.errorObj.hasMessage = true;
            this.errorObj.typeMessage = "error";
            this.errorObj.message = 'An error has occurred';

            setTimeout(() => {
              this.errorObj.hasMessage = false;
              this.errorObj.message = '';
            }, 3000);
          }
        );
    } else {
      console.error('Invalid ID provided for deletion.');
      this.errorObj.hasMessage = true;
      this.errorObj.typeMessage = "error";
      this.errorObj.message = 'Invalid ID provided for deletion.';

      setTimeout(() => {
        this.errorObj.hasMessage = false;
        this.errorObj.message = '';
      }, 3000);
    }
  }


  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
