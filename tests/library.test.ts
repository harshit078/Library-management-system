import { Library } from '../src/models/library';
import { BookData } from '../src/models/types';
import {
  BookNotFoundError,
  BookNotAvailableError,
  DuplicateBookError,
  InvalidReturnError
} from '../src/models/error';

describe('Library Management System', () => {
    let library: Library;
    const testBook: BookData = {
      isbn: '1234',
      title: 'Clean Code',
      author: 'Robert C. Martin',
      year: 2008
    };
  
    beforeEach(() => {
      library = new Library();
    });
  
    describe('Book Management', () => {
      it('should add a new book to the library', () => {
        const book = library.addBook(testBook);
        expect(book.isbn).toBe(testBook.isbn);
        expect(library.getAvailableBooks().length).toBe(1);
      });
  
      it('should not allow duplicate books', () => {
        library.addBook(testBook);
        expect(() => library.addBook(testBook)).toThrow(DuplicateBookError);
      });
  
      it('should retrieve a book by ISBN', () => {
        library.addBook(testBook);
        const book = library.getBook(testBook.isbn);
        expect(book.title).toBe(testBook.title);
      });
  
      it('should throw when getting non-existent book', () => {
        expect(() => library.getBook('nonexistent')).toThrow(BookNotFoundError);
      });
    });
  
    describe('Borrowing System', () => {
      const borrowerId = 'user123';
  
      beforeEach(() => {
        library.addBook(testBook);
      });
  
      it('should allow borrowing an available book', () => {
        const record = library.borrowBook(testBook.isbn, borrowerId);
        expect(record.borrowerId).toBe(borrowerId);
        expect(record.isbn).toBe(testBook.isbn);
        expect(library.getAvailableBooks().length).toBe(0);
      });
  
      it('should not allow borrowing an unavailable book', () => {
        library.borrowBook(testBook.isbn, borrowerId);
        expect(() => library.borrowBook(testBook.isbn, borrowerId))
          .toThrow(BookNotAvailableError);
      });
  
      it('should allow returning a borrowed book', () => {
        library.borrowBook(testBook.isbn, borrowerId);
        const book = library.returnBook(testBook.isbn);
        expect(book.available).toBe(true);
        expect(library.getAvailableBooks().length).toBe(1);
      });
  
      it('should not allow returning a non-borrowed book', () => {
        expect(() => library.returnBook(testBook.isbn))
          .toThrow(InvalidReturnError);
      });
  
      it('should maintain accurate borrow history', () => {
        library.borrowBook(testBook.isbn, borrowerId);
        library.returnBook(testBook.isbn);
        const history = library.getBorrowHistory(testBook.isbn);
        expect(history.length).toBe(1);
        expect(history[0].returnDate).toBeDefined();
      });
    });
  
    describe('Available Books', () => {
      it('should view all available books in the library', () => {
        const book1: BookData = {
          isbn: '1001',
          title: 'The Secret',
          author: 'Om Panchwate',
          year: 2024
        };
        
        const book2: BookData = {
          isbn: '1002',
          title: 'Life Amazing Secret',
          author: 'Gaur Gopal Das',
          year: 2022
        };
  
        // Add both books to the library
        library.addBook(book1);
        library.addBook(book2);
  
        // Get available books
        const availableBooks = library.getAvailableBooks();
  
        // Verify both books are available
        expect(availableBooks.length).toBe(2);
        expect(availableBooks.some(book => book.isbn === book1.isbn)).toBe(true);
        expect(availableBooks.some(book => book.isbn === book2.isbn)).toBe(true);
      });
  
      it('should show correct available books after some are borrowed', () => {
        const book1: BookData = {
          isbn: '1001',
          title: 'The Secret',
          author: 'Om Panchwate',
          year: 2024
        };
        
        const book2: BookData = {
          isbn: '1002',
          title: 'Life Amazing Secret',
          author: 'Gaur Gopal Das',
          year: 2022
        };
  
        // Add both books
        library.addBook(book1);
        library.addBook(book2);
  
        // Borrow one book
        library.borrowBook(book1.isbn, 'user123');
  
        // Get available books
        const availableBooks = library.getAvailableBooks();
  
        // Verify only the non-borrowed book is available
        expect(availableBooks.length).toBe(1);
        expect(availableBooks[0].isbn).toBe(book2.isbn);
      });
    });
  });