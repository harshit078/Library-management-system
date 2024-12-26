export interface BookData {
    isbn: string;
    title: string;
    author: string;
    year: number;
  }
  
  export interface BorrowRecord {
    isbn: string;
    borrowerId: string;
    borrowDate: Date;
    returnDate?: Date;
  }
  