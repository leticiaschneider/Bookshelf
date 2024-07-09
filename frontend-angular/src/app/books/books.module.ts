import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksRoutingModule } from './books-routing.module';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookFormComponent } from './components/book-form/book-form.component';
import { StatusReadingPipe } from '../pipes/status-reading.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { PaginationComponent } from './components/book-list/pagination/pagination.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    BookListComponent,
    BookFormComponent,
    StatusReadingPipe,
    PaginationComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    BooksRoutingModule
  ]
})
export class BooksModule { }
