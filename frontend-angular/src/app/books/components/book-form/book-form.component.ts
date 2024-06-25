import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book, StatusReading, Format } from '../../../model/book.model';
import { Subject } from 'rxjs/internal/Subject';
import { BookService } from '../../../service/book.service';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.scss'
})
export class BookFormComponent implements OnDestroy {
  bookForm!: FormGroup;
  readingStatuses = Object.values(StatusReading);
  formats = Object.values(Format);
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private fb: FormBuilder, private bookService: BookService) { }

  ngOnInit(): void {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: [null],
      publicationYear: [null],
      language: [null],
      pages: [null],
      genre: [null],
      coverImageUrl: [null],
      readingStatus: [''],
      formats: [''],
    });
  }

  onSubmit(): void {
    const book: Book = this.bookForm.value;
    console.log(book);

    if (this.bookForm.valid) {
      const bookData = this.bookForm.value;

      bookData.readingStatus = bookData.readingStatus !== '' ? [this.mapReadingStatusToCode(bookData.readingStatus)] : [];
      bookData.formats = bookData.formats !== '' ? [this.mapFormatToCode(bookData.formats)] : [];

      this.bookService.saveBook(bookData)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          (savedBook) => {
            console.log('Book saved successfully:', savedBook);
          },
          (error) => {
            console.error('Error saving the book:', error);
          }
        );
    } else {
      console.error('Invalid form. Please check the fields.');
    }
  }

  mapReadingStatusToCode(status: StatusReading): number {
    switch (status) {
      case StatusReading.Read:
        return 0;
      case StatusReading.Reading:
        return 1;
      case StatusReading.WantToRead:
        return 2;
      default:
        throw new Error('Invalid reading status');
    }
  }

  mapFormatToCode(format: Format): number {
    switch (format) {
      case Format.Hardcover:
        return 0;
      case Format.Paperback:
        return 1;
      case Format.eBook:
        return 2;
      case Format.Audiobook:
        return 3;
      default:
        throw new Error('Invalid format');
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
