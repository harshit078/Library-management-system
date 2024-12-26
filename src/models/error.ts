  export class LibraryError extends Error {
    constructor(message: string) {
      super(message);
      this.name = this.constructor.name;
    }
  }
  
  export class BookNotFoundError extends LibraryError {
    constructor(isbn: string) {
      super(`Book with ISBN ${isbn} not found`);
    }
  }
  
  export class BookNotAvailableError extends LibraryError {
    constructor(isbn: string) {
      super(`Book with ISBN ${isbn} is not available`);
    }
  }
  
  export class DuplicateBookError extends LibraryError {
    constructor(isbn: string) {
      super(`Book with ISBN ${isbn} already exists`);
    }
  }
  
  export class InvalidReturnError extends LibraryError {
    constructor(isbn: string) {
      super(`Cannot return book with ISBN ${isbn}: book was not borrowed or doesn't exist`);
    }
  }