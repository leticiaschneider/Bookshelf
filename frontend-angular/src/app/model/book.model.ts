export interface Book {
    id?: number;
    title: string;
    author: string;
    readingStatus: StatusReading[];
    formats: Format[];
  }
  
  export enum StatusReading {
    Read = 'Read',
    Reading = 'Reading',
    WantToRead = 'Want to Read'
  }
  
  export enum Format {
    Hardcover = 'Hardcover',
    Paperback = 'Paperback',
    eBook = 'eBook',
    Audiobook = 'Audiobook'
  }
  