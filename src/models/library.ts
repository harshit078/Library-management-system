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
  // Adds a new book to the library
  addBook(bookData: BookData): Book {
    if (this.books.has(bookData.isbn)) {
      throw new DuplicateBookError(bookData.isbn);  // Throw error if book already exists
    }

    const book = new Book(bookData);
    this.books.set(book.isbn, book);
    return book;
  }
  // Retrieves a book by its ISBN
  getBook(isbn: string): Book {
    const book = this.books.get(isbn); // Get the book from the map
    if (!book) {
      throw new BookNotFoundError(isbn);
    }
    return book;
  }

  // Returns a list of available books
  getAvailableBooks(): Book[] {
    return Array.from(this.books.values()).filter(book => book.available); // Filter and return available books
  }

  // Returns a list of borrowed books
  getBorrowedBooks(): Book[] {
    return Array.from(this.books.values()).filter(book => !book.available); // Filter and return borrowed books
  }

  // Allows a user to borrow a book
  borrowBook(isbn: string, borrowerId: string): BorrowRecord {
    const book = this.getBook(isbn);  // Retrieve the book by ISBN
    
    if (!book.available) {
      throw new BookNotAvailableError(isbn);
    }

    book.markAsBorrowed(); // Mark the book as borrowed
    
    const record: BorrowRecord = {
      isbn,
      borrowerId,
      borrowDate: new Date()
    };
    
    this.borrowRecords.push(record); // Add the record to the borrow records
    return record;
  }

  // Allows a user to return a borrowed book
  returnBook(isbn: string): Book {
    const book = this.getBook(isbn);
    
    if (book.available) {
      throw new InvalidReturnError(isbn);
    }

    const record = this.borrowRecords.find(
      r => r.isbn === isbn && !r.returnDate // Find the corresponding borrow record
    );

    if (record) {
      record.returnDate = new Date();
    }

    book.markAsReturned();  // Mark the book as returned
    return book; // Return the returned book
  }

  // Retrieves the borrow history for a specific book or all books
  getBorrowHistory(isbn?: string): BorrowRecord[] {
    if (isbn) {
      return this.borrowRecords.filter(record => record.isbn === isbn);
    }
    return [...this.borrowRecords];
  }
}