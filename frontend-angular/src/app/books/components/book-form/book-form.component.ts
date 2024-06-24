import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book, StatusReading, Format } from '../../../model/book.model';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.scss'
})
export class BookFormComponent {
  bookForm!: FormGroup;
  readingStatuses = Object.values(StatusReading);
  formats = Object.values(Format);

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: [''],
      publicationYear: [null],
      language: [''],
      pages: [null],
      genre: [''],
      coverImageUrl: [''],
      readingStatus: [[]],
      formats: [[]]
    });
  }

  onSubmit(): void {
    const book: Book = this.bookForm.value;
    console.log(book);
  }
}
