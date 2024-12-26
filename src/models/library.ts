import { Book } from './book';
import { BookData, BorrowRecord } from './types';
import {
  BookNotFoundError,
  BookNotAvailableError,
  DuplicateBookError,
  InvalidReturnError
} from './error';

export class Library {
  private books: Map<string, Book>;
  private borrowRecords: BorrowRecord[];

  constructor() {
    this.books = new Map();
    this.borrowRecords = [];
  }

  addBook(bookData: BookData): Book {
    if (this.books.has(bookData.isbn)) {
      throw new DuplicateBookError(bookData.isbn);
    }

    const book = new Book(bookData);
    this.books.set(book.isbn, book);
    return book;
  }

  getBook(isbn: string): Book {
    const book = this.books.get(isbn);
    if (!book) {
      throw new BookNotFoundError(isbn);
    }
    return book;
  }

  getAvailableBooks(): Book[] {
    return Array.from(this.books.values()).filter(book => book.available);
  }

  getBorrowedBooks(): Book[] {
    return Array.from(this.books.values()).filter(book => !book.available);
  }

  borrowBook(isbn: string, borrowerId: string): BorrowRecord {
    const book = this.getBook(isbn);
    
    if (!book.available) {
      throw new BookNotAvailableError(isbn);
    }

    book.markAsBorrowed();
    
    const record: BorrowRecord = {
      isbn,
      borrowerId,
      borrowDate: new Date()
    };
    
    this.borrowRecords.push(record);
    return record;
  }

  returnBook(isbn: string): Book {
    const book = this.getBook(isbn);
    
    if (book.available) {
      throw new InvalidReturnError(isbn);
    }

    const record = this.borrowRecords.find(
      r => r.isbn === isbn && !r.returnDate
    );

    if (record) {
      record.returnDate = new Date();
    }

    book.markAsReturned();
    return book;
  }

  getBorrowHistory(isbn?: string): BorrowRecord[] {
    if (isbn) {
      return this.borrowRecords.filter(record => record.isbn === isbn);
    }
    return [...this.borrowRecords];
  }

  searchBooks(query: string): Book[] {
    const searchTerm = query.toLowerCase();
    return Array.from(this.books.values()).filter(book => 
      book.title.toLowerCase().includes(searchTerm) ||
      book.author.toLowerCase().includes(searchTerm) ||
      book.isbn.includes(searchTerm)
    );
  }
}