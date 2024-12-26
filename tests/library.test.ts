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
      library = new Library(); // Create a new library instance before each test
    });
  
    describe('Book Management', () => {
      it('should add a new book to the library', () => {
        const book = library.addBook(testBook); // Add a test book
        expect(book.isbn).toBe(testBook.isbn); // Verify the book was added correctly
        expect(library.getAvailableBooks().length).toBe(1); // Check available books count
      });
  
      it('should not allow duplicate books', () => {
        library.addBook(testBook); // Add the test book
        expect(() => library.addBook(testBook)).toThrow(DuplicateBookError); // Ensure duplicate throws error
      });
  
      it('should retrieve a book by ISBN', () => {
        library.addBook(testBook); // Add the test book
        const book = library.getBook(testBook.isbn); // Retrieve the book by ISBN
        expect(book.title).toBe(testBook.title); // Verify the retrieved book's title
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
        const record = library.borrowBook(testBook.isbn, borrowerId); // Borrow the book
        expect(record.borrowerId).toBe(borrowerId); // Verify the borrower ID
        expect(record.isbn).toBe(testBook.isbn); // Verify the borrowed book's ISBN
        expect(library.getAvailableBooks().length).toBe(0); // Check that no books are available
      });
  
      it('should not allow borrowing an unavailable book', () => {
        library.borrowBook(testBook.isbn, borrowerId); // Borrow the book
        expect(() => library.borrowBook(testBook.isbn, borrowerId))
          .toThrow(BookNotAvailableError); // Ensure error for borrowing unavailable book
      });
  
      it('should allow returning a borrowed book', () => {
        library.borrowBook(testBook.isbn, borrowerId); // Borrow the book
        const book = library.returnBook(testBook.isbn); // Return the book
        expect(book.available).toBe(true); // Verify the book is now available
        expect(library.getAvailableBooks().length).toBe(1); // Check available books count
      });
  
      it('should not allow returning a non-borrowed book', () => {
        expect(() => library.returnBook(testBook.isbn))
          .toThrow(InvalidReturnError);
      });
  
      it('should maintain accurate borrow history', () => {
        library.borrowBook(testBook.isbn, borrowerId); // Borrow the book
        library.returnBook(testBook.isbn); // Return the book
        const history = library.getBorrowHistory(testBook.isbn); // Get borrow history
        expect(history.length).toBe(1); // Ensure history has one entry
        expect(history[0].returnDate).toBeDefined(); // Verify return date is defined
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
        expect(availableBooks.length).toBe(2); // Check the count of available books
        expect(availableBooks.some(book => book.isbn === book1.isbn)).toBe(true); // Verify book1 is available
        expect(availableBooks.some(book => book.isbn === book2.isbn)).toBe(true); // Verify book2 is available
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
  
        library.addBook(book1);
        library.addBook(book2);
  
        library.borrowBook(book1.isbn, 'user123');
  
        const availableBooks = library.getAvailableBooks();
  
        // Verify only the non-borrowed book is available
        expect(availableBooks.length).toBe(1); // Check the count of available books
        expect(availableBooks[0].isbn).toBe(book2.isbn); // Verify the available book is book2
      });
    });
  });