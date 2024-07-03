import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book, StatusReading, Format } from '../../../model/book.model';
import { Subject } from 'rxjs/internal/Subject';
import { BookService } from '../../../service/book.service';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.scss'
})
export class BookFormComponent implements OnDestroy {
  bookForm!: FormGroup;
  readingStatuses = Object.values(StatusReading);
  formats = Object.values(Format);
  coverImageUrl: string | ArrayBuffer | null = null;
  bookId: number | null = null;
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.route.paramMap.subscribe(params => {
      this.bookId = +params.get('id')!;
      if (this.bookId) {
        this.loadBookData(this.bookId);
      }
    });
  }

  initializeForm(): void {
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

  loadBookData(id: number): void {
    this.bookService.getBookById(id).subscribe((book: Book) => {
      this.bookForm.patchValue(book);
    });
  }

  onSubmit(): void {
    const book: Book = this.bookForm.value;
    
    if (this.bookForm.valid) {
      const bookData = this.bookForm.value;

      bookData.readingStatus = bookData.readingStatus !== '' ? [this.mapReadingStatusToCode(bookData.readingStatus)] : [];
      bookData.formats = bookData.formats !== '' ? [this.mapFormatToCode(bookData.formats)] : [];
      
      if (this.bookId) {
        this.updateBookData(bookData);
      }
      else {
        this.saveBookData(bookData);
      }
      
    } else {
      console.error('Invalid form. Please check the fields.');
    }
  }

  saveBookData(bookData: Book) {
    this.bookService.saveBook(bookData)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(
      (savedBook) => {
        this.router.navigate(['/books']);
        console.log('Book saved successfully:', savedBook);
      },
      (error) => {
        console.error('Error saving the book:', error);
      }
    );
  }

  updateBookData(bookData: Book) {
    this.bookService.updateBook(this.bookId, bookData).subscribe(
      updatedBook => {
        console.log('Book updated successfully', updatedBook);
        this.router.navigate(['/books']);
      },
      error => {
        console.error('Error updating book', error);
      }
    );
  }

  mapReadingStatusToCode(status: StatusReading): number {
    let statusSplited = status.split(' ').filter(word => word.length > 0).join('').toUpperCase();

    switch (statusSplited) {
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
  
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files?.length) {
      return;
    }

    const file = input.files[0];
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file.');
      input.value = ''; // Clear the input
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.coverImageUrl = reader.result;
      this.bookForm.patchValue({ coverImageUrl: this.coverImageUrl });
    };
    reader.readAsDataURL(file);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
