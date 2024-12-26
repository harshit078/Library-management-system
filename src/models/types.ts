export interface BookData {
    isbn: string;  //isbn: Unique identifier for the book
    title: string;
    author: string;
    year: number;
  }
  
  export interface BorrowRecord {
    isbn: string;  // Unique identifier for the borrowed book
    borrowerId: string;  // Identifier for the borrower
    borrowDate: Date;
    returnDate?: Date;
  }
  