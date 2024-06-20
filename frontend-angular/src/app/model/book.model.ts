export interface Book {
  id?: number;
  title: string;
  author?: string;
  publicationYear?: number;
  language?: string;
  pages?: number;
  genre?: string;
  coverImageUrl?: string;
  readingStatus: StatusReading;
  formats: Format;
}

export enum StatusReading {
  Read = 'READ',
  Reading = 'READING',
  WantToRead = 'WANTTOREAD'
}

export enum Format {
  Hardcover = 'Hardcover',
  Paperback = 'Paperback',
  eBook = 'eBook',
  Audiobook = 'Audiobook'
}
